"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { LampContainer } from "@/components/ui/lamp";
export function LampSection() {
  const t = useTranslations('Pages.Home.LampSection');

  return (
    <section>
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="bg-linear-to-br from-blue-300 to-blue-500 py-4 bg-clip-text text-center text-4xl font-semibold tracking-tight text-transparent md:text-6xl"
        >
          {t('title')}
        </motion.h1>
        
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{
             delay: 0.5,
             duration: 0.8,
             ease: "easeInOut",
           }}
           className="mt-4 flex flex-col items-center gap-4"
        >
          <p className="text-muted-foreground text-center max-w-lg mx-auto">
            {t('subtitle')}
          </p>
          <Button size="lg" className="mt-4">
            {t('cta')} <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </LampContainer>
    </section>
  );
}