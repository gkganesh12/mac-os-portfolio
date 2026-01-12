import React from 'react';

export const AboutApp: React.FC = () => {
  return (
    <div className="h-full overflow-auto p-6 text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-1 text-3xl font-bold">Deepak Tewatia</h1>
        <h2 className="mb-6 font-mono text-xl font-medium tracking-tight text-blue-400">
          Software Development Engineer — Developer / DevOps
        </h2>

        <div className="space-y-4 leading-relaxed text-zinc-300">
          <p>
            I am a Full Stack Engineer with 3+ years of experience in architecting and scaling
            robust web applications. My expertise lies in building end-to-end solutions using React,
            Node.js, and Cloud Infrastructure (AWS) that drive business growth and optimize user
            experience.
          </p>
          <p>
            I have a proven track record of designing microservice architectures, optimizing search
            workflows, and managing scalable infrastructure. I thrive in environments that challenge
            me to push the boundaries of modern web performance and cloud-native systems.
          </p>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8">
          <h3 className="mb-4 text-lg font-semibold text-white">Technical Core</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-3 text-xs font-bold tracking-widest text-zinc-500 uppercase">
                Stacks & Frameworks
              </h4>
              <ul className="space-y-1.5 text-sm">
                <li>
                  <span className="text-zinc-500">•</span> React / Next.js / Redux
                </li>
                <li>
                  <span className="text-zinc-500">•</span> Node.js / Express / GraphQL
                </li>
                <li>
                  <span className="text-zinc-500">•</span> Go / Python / Hasura / Prisma
                </li>
                <li>
                  <span className="text-zinc-500">•</span> Tailwind CSS / Framer Motion / GSAP
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-bold tracking-widest text-zinc-500 uppercase">
                Infrastructure & DB
              </h4>
              <ul className="space-y-1.5 text-sm">
                <li>
                  <span className="text-zinc-500">•</span> AWS (EC2, S3, RDS, Lambda, SQS)
                </li>
                <li>
                  <span className="text-zinc-500">•</span> Docker / Nginx / GitHub Actions
                </li>
                <li>
                  <span className="text-zinc-500">•</span> PostgreSQL / MongoDB / Redis
                </li>
                <li>
                  <span className="text-zinc-500">•</span> CI/CD / Automated Workflows
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
