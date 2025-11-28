"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { LampContainer } from "@/components/ui/lamp";
export function LampSection() {
  const t = useTranslations('Pages.Home.LampSection');

  return (
    <section className="bg-background">
      <LampContainer className="pt-32 md:pt-48">
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          {t.rich('title', {
            br: () => <br />
          })}
        </motion.h1>
        
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{
             delay: 0.5,
             duration: 0.8,
             ease: "easeInOut",
           }}
           className="mt-8 flex flex-col items-center gap-4"
        >
          <p className="text-muted-foreground text-center max-w-lg mx-auto">
            {t('subtitle')}
          </p>
          <Button size="lg" className="rounded-full px-8 bg-cyan-500 hover:bg-cyan-600 text-white border-0">
            {t('cta')} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </LampContainer>
    </section>
  );
}