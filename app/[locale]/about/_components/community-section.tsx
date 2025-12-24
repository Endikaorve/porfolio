'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function CommunitySection() {
  const t = useTranslations();

  return (
    <section className="relative py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-[12vw] sm:text-[10vw] md:text-8xl font-black text-white leading-none">
            {t('community.title.line1')}
            <br />
            <span className="text-primary">{t('community.title.line2')}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 overflow-hidden">
          {/* Profesor */}
          <motion.div
            className="relative group overflow-visible"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute -inset-4 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" />
            <div className="relative border-l-4 border-primary pl-8 py-4">
              <span className="text-white/40 font-mono text-sm">
                {t('community.teaching.period')}
              </span>
              <h3 className="text-3xl font-black text-white mt-2 mb-3">
                {t('community.teaching.title')}
              </h3>
              <p className="text-white/70 mb-4">
                {t('community.teaching.subtitle')}
              </p>
              <p className="text-white/60 leading-relaxed mb-6">
                {t('community.teaching.description')}
              </p>

              {/* Temas del curso */}
              <div className="space-y-3 mt-6">
                <div className="border-l-2 border-primary/40 pl-4 py-1">
                  <p className="text-white/70 text-sm leading-relaxed">
                    {t('community.teaching.topics.engineering')}
                  </p>
                </div>
                <div className="border-l-2 border-primary/40 pl-4 py-1">
                  <p className="text-white/70 text-sm leading-relaxed">
                    {t('community.teaching.topics.architecture')}
                  </p>
                </div>
                <div className="border-l-2 border-primary/40 pl-4 py-1">
                  <p className="text-white/70 text-sm leading-relaxed">
                    {t('community.teaching.topics.culture')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Charlas */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300 blur-xl" />
              <div className="relative border-l-4 border-white pl-8 py-4">
                <span className="text-white/40 font-mono text-sm">
                  {t('community.talks.vibe.year')}
                </span>
                <h3 className="text-2xl font-black text-white mt-2 mb-2">
                  {t('community.talks.vibe.title')}
                </h3>
                <p className="text-white/60 text-sm mb-2">
                  {t('community.talks.vibe.event')}
                </p>
                <p className="text-white/50 leading-relaxed text-sm">
                  {t('community.talks.vibe.description')}
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300 blur-xl" />
              <div className="relative border-l-4 border-white pl-8 py-4">
                <span className="text-white/40 font-mono text-sm">
                  {t('community.talks.rendering.year')}
                </span>
                <h3 className="text-2xl font-black text-white mt-2 mb-2">
                  {t('community.talks.rendering.title')}
                </h3>
                <p className="text-white/60 text-sm mb-2">
                  {t('community.talks.rendering.event')}
                </p>
                <p className="text-white/50 leading-relaxed text-sm">
                  {t('community.talks.rendering.description')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
