import { MaxWidthWrapper } from '@/components/MaxWidthWrapper'
import { getPayloadClient } from '@/get-payload'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    productId: string
  }
}

const BREADCRUMBS = [
  {
    id: 1,
    name: 'Home',
    href: '/',
  },
  {
    id: 2,
    name: 'Products',
    href: '/products',
  },
]

const Page = async ({ params }: PageProps) => {
  const { productId } = params

  const payload = await getPayloadClient()

  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
      approvedForSale: {
        equals: 'approved',
      },
    },
  })

  const [product] = products
  console.log('%c [ product ]-44', 'font-size:13px; background:#7a6a5d; color:#beaea1;', product)

  if (!product) return notFound()

  return (
    <MaxWidthWrapper className='bg-white'>
      <div className='bg-white'>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
          {/* TODO Prodyct Details */}
          <div className='lg:max-w-lg lg:self-end '>
            <ol className='flex items-center space-x-2'>
              {BREADCRUMBS.map((breadcrumb, index) => {
                return (
                  <li key={breadcrumb.id}>
                    <div className='flex items-center text-sm '>
                      <Link
                        href={breadcrumb.href}
                        className='font-medium text-sm text-muted-foreground hover:text-gray-900'>
                        {breadcrumb.name}
                      </Link>
                      {index !== BREADCRUMBS.length - 1 ? (
                        <svg
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          aria-hidden='true'
                          className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'>
                          <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                        </svg>
                      ) : null}
                    </div>
                  </li>
                )
              })}
            </ol>

            <div className='mt-4'>
              <h1>{product.name}</h1>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default Page