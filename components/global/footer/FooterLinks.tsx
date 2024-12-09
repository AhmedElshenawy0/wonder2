import Link from 'next/link'

const FooterLinks = () => {
  return (
    <div className='flex items-center justify-between my-5'>
      <Link href="#" className='text-[12px] text-[#737373]'>Privacy Policy</Link>
      <Link href="#" className='text-[12px] text-[#737373]'>Terms and Service</Link>
      <Link href="#" className='text-[12px] text-[#737373]'>SC Supply Chain Trancparency</Link>
      <Link href="#" className='text-[12px] text-[#737373]'>Vendor Code Of Conduct</Link>
      <Link href="#" className='text-[12px] text-[#737373]'>Sitemap Pages</Link>
      <Link href="#" className='text-[12px] text-[#737373]'>Sitemap Products</Link>
    </div>
  )
}

export default FooterLinks