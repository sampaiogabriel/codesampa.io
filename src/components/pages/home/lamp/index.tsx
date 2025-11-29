"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { LampContainer } from "@/components/ui/lamp";
import { Link } from "@/lib/i18n/navigation";
export function LampSection() {
  const t = useTranslations('Pages.Home.LampSection');

  return (
    <section>
      <LampContainer>
<div className="flex flex-col items-center justify-center relative w-full text-center">
                            <h2 className="text-4xl lg:text-5xl xl:text-6xl lg:leading-snug! font-semibold mt-8">
                                From Idea to Launch <br /> Faster Than Ever
                            </h2>
                            <p className="text-muted-foreground mt-6 max-w-md mx-auto">
                                Build stunning websites with Astra&apos;s intuitive drag-and-drop builder and powerful AI assistant
                            </p>
                            <Button  className="mt-6" asChild>
                                <Link href="/sign-in">
                                    Get started for free
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
      </LampContainer>
    </section>
  );
}