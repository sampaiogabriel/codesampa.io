'use server';

import { getTranslations } from 'next-intl/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);
const audienceId = process.env.RESEND_AUDIENCE_ID;

const schema = z.object({
  email: z.string().email()
});

export async function subscribeToNewsletter(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData
) {
  const t = await getTranslations('Newsletter');

  const email = formData.get('email');

  // 2. Validação Zod
  const validatedFields = schema.safeParse({ email });

  if (!validatedFields.success) {
    return {
      success: false,
      message: t('validation.invalid_email')
    };
  }

  try {
    if (!audienceId) {
      throw new Error('Audience ID not configured.');
    }

    // 3. Criar contato no Resend
    const { error: contactError } = await resend.contacts.create({
      email: validatedFields.data.email,
      audienceId: audienceId,
      unsubscribed: false
    });

    if (contactError) {
      console.error('Resend Contact Error:', contactError);
      if (contactError.message.includes('already')) {
        return { success: false, message: t('actions.error_exists') };
      }
      return { success: false, message: t('actions.error_generic') };
    }

    const { error: emailError } = await resend.emails.send({
      from: 'Gabriel Sampaio <contato@codesampa.io>',
      to: validatedFields.data.email,
      subject: t('email.subject'),
      html: `
        <div style="font-family: sans-serif; color: #333; line-height: 1.6;">
          <h1>${t('email.title')}</h1>
          <p>${t('email.greeting')}</p>
          <p>${t.raw('email.content')}</p> <p>${t('email.reply_invite')}</p>
          <br />
          <p>${t('email.closing')}<br />Gabriel Sampaio</p>
          <p style="font-size: 12px; color: #888;">${t('email.footer')}</p>
        </div>
      `
    });

    if (emailError) {
      console.error('Resend Email Error:', emailError);
    }

    return { success: true, message: t('actions.success') };
  } catch (error) {
    console.error(error);
    return { success: false, message: t('actions.error_server') };
  }
}
