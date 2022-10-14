import clsx from 'clsx'
import { motion } from 'framer-motion'
import {
  GraphUpArrow,
  Infinity as Infinite,
  LightningCharge,
  People,
} from 'react-bootstrap-icons'

function Feature({ name, tagline, desc, theme, reverse }) {
  const [headClass, Icon] = theme
  return (
    <div className='my-16 max-w-7xl overflow-hidden rounded-lg lg:grid lg:grid-cols-2 lg:gap-4'>
      <div
        className={clsx([
          'px-6 pt-10 pb-12 sm:px-16 sm:pt-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20',
          reverse ? 'order-1' : 'order-0',
        ])}
      >
        <motion.div
          initial={{ x: reverse ? 100 : -100 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className='font-display lg:self-center '
        >
          <h2 className='text-3xl font-bold text-slate-700 dark:text-slate-200 sm:text-4xl'>
            <motion.span
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className={clsx(['block text-lg', headClass])}
            >
              {name}
            </motion.span>
            <span className='block'>{tagline}</span>
          </h2>
          <motion.p
            className='mt-4 text-lg leading-6 text-slate-600 dark:text-slate-300'
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {desc}
          </motion.p>
        </motion.div>
      </div>
      <motion.div
        className={clsx([
          'flex items-center justify-center',
          reverse ? 'order-0' : 'order-1',
        ])}
        initial={{ x: reverse ? -100 : 100 }}
        whileInView={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Icon className={clsx(['h-32 w-32', headClass])} />
      </motion.div>
    </div>
  )
}

Feature.Themes = {
  Fast: ['text-blue-500 dark:text-blue-400', LightningCharge],
  Scalable: ['text-purple-500 dark:text-purple-400', GraphUpArrow],
  CollisionFree: ['text-violet-500 dark:text-violet-400', Infinite],
  Open: ['text-slate-500 dark:text-slate-400', People],
}
export default Feature
