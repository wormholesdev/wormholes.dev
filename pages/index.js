import Feature from '@/components/home/feature'
import Hero from '@/components/home/hero'
import { PageLayout } from '@/components/layouts'

export default function HomePage() {
  return (
    <PageLayout
      title='Wormholes - An open-source link shortener that scales'
      description='Wormholes is an open source link shortener that can be self hosted and is scalable'
    >
      <div className='flex w-full flex-col items-center justify-center'>
        <Hero />
        <Feature
          name='Fast'
          tagline='Generate millions of links within a minute'
          desc='wormholes allows you to generate large amount of links with low latency'
          type='Fast'
        />
        <Feature
          name='Simple yet scalable'
          tagline='Run quickly or be ready for scale'
          desc='wormholes can quickly run in unified mode and when you grow, you can scale with distributed mode.'
          type='Scalable'
          reverse
        />
        <Feature
          name='Collision Free'
          tagline='No collisions anymore'
          desc="With a centralized generator and it's unique architecture, you'll never run out of IDs again."
          type='CollisionFree'
        />
        <Feature
          name='Open Source'
          tagline='Built for the community'
          desc='Wormholes is open source and licensed it under AGPL.'
          type='Open'
          reverse
        />
      </div>
    </PageLayout>
  )
}
