import { HomeLayout } from '@/components/interface/layouts/home/home-layout'

export default function HomePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <HomeLayout>{children}</HomeLayout>
}
