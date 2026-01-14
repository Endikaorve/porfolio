'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function ExpertiseSection() {
  const t = useTranslations();

  const expertiseItems = [
    {
      title: t('expertise.items.product.title'),
      description: t('expertise.items.product.description'),
    },
    {
      title: t('expertise.items.architecture.title'),
      description: t('expertise.items.architecture.description'),
    },
    {
      title: t('expertise.items.xp.title'),
      description: t('expertise.items.xp.description'),
    },
    {
      title: t('expertise.items.contextEngineering.title'),
      description: t('expertise.items.contextEngineering.description'),
    },
    {
      title: t('expertise.items.leadership.title'),
      description: t('expertise.items.leadership.description'),
    },
    {
      title: t('expertise.items.culture.title'),
      description: t('expertise.items.culture.description'),
    },
  ];

  return (
    <section className="relative py-32">
      <div className="container mx-auto px-4 xl:px-8">
        <motion.h2
          className="text-6xl md:text-8xl font-black text-white mb-20 leading-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t('expertise.title.line1')}
          <br />
          <span className="text-primary">{t('expertise.title.line2')}</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {expertiseItems.map((item, i) => {
            const isHighlighted = i === 3; // Context Engineering
            return (
              <motion.div
                key={i}
                className="border-l-4 border-primary pl-8 py-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-white/30 font-mono text-sm">
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                <h3 className="text-3xl font-black text-white mt-2 mb-4">
                  {item.title}
                  {isHighlighted && (
                    <span className="ml-3 text-sm text-primary align-top">
                      [ ✦ ]
                    </span>
                  )}
                </h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
