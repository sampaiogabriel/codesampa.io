'use server';

import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);
const audienceId = process.env.RESEND_AUDIENCE_ID;

// Validação simples do formato de email
const schema = z.object({
  email: z.string().email({ message: 'Por favor, insira um email válido.' })
});

export async function subscribeToNewsletter(
  prevState: any,
  formData: FormData
) {
  const email = formData.get('email');

  // 1. Validar o formato
  const validatedFields = schema.safeParse({
    email
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message:
        validatedFields.error.flatten().fieldErrors.email?.[0] ||
        'Erro de validação.'
    };
  }

  try {
    // 2. Salvar na lista de contatos do Resend
    // Isso funciona mesmo sem domínio verificado (apenas armazenamento)
    if (!audienceId) {
      throw new Error('Audience ID não configurado.');
    }

    const { error } = await resend.contacts.create({
      email: validatedFields.data.email,
      audienceId: audienceId,
      unsubscribed: false
    });

    if (error) {
      console.error('Resend Error:', error);
      // Evita expor erros técnicos, mas avisa se já existe
      if (error.message.includes('already')) {
        return { success: false, message: 'Este email já está inscrito!' };
      }
      return {
        success: false,
        message: 'Falha ao inscrever. Tente novamente mais tarde.'
      };
    }

    // 3. (Opcional agora) Enviar email de boas-vindas
    // Sem domínio, isso só chegará se o destino for seu próprio email.
    // Você pode descomentar isso no futuro.
    /*
    await resend.emails.send({
      from: 'Gabriel <voce@codesampa.io>',
      to: validatedFields.data.email,
      subject: 'Bem-vindo ao codesampa.io!',
      html: '<p>Obrigado por se inscrever! Em breve novidades sobre React e Arquitetura.</p>',
    });
    */

    return { success: true, message: 'Inscrição realizada com sucesso! 🚀' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Erro interno no servidor.' };
  }
}
