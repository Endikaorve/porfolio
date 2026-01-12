'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site';

export function AuthorSignature() {
  const t = useTranslations('blog');

  return (
    <motion.div
      className="mt-16 pt-8 border-t border-white/10"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-5">
        {/* Foto - cuadrada, sin border-radius, con borde parcial */}
        <div className="relative">
          {/* Borde parcial decorativo */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary" />
          
          <Image
            src="/endika.jpg"
            alt={siteConfig.author.name}
            width={72}
            height={72}
            className="w-16 h-16 md:w-[72px] md:h-[72px] object-cover grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>

        {/* Info del autor */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-mono text-white/40 uppercase tracking-wider">
            {t('writtenBy')}
          </span>
          <span className="text-lg md:text-xl font-bold text-white">
            {siteConfig.author.name}
          </span>
          <span className="text-sm text-white/50">
            {siteConfig.author.role}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
