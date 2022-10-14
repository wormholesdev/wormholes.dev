import Feature from '@/components/home/feature'
import Hero from '@/components/home/hero'

export default function HomePage() {
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <Hero />
      <Feature
        name='Fast'
        tagline='Generate millions of links within a minute'
        desc='wormholes allows you to generate large amount of links with low latency'
        theme={Feature.Themes.Fast}
      />
      <Feature
        name='Simple yet scalable'
        tagline='Run quickly or be ready for scale'
        desc='wormholes can quickly run in unified mode and when you grow, you can scale with distributed mode.'
        theme={Feature.Themes.Scalable}
        reverse
      />
      <Feature
        name='Collision Free'
        tagline='No collisions anymore'
        desc="With a centralized generator and it's unique architecture, you'll never run out of IDs again."
        theme={Feature.Themes.CollisionFree}
      />
      <Feature
        name='Open Source'
        tagline='Built for the community'
        desc='Wormholes is open source and licensed it under AGPL.'
        theme={Feature.Themes.Open}
        reverse
      />
    </div>
  )
}
