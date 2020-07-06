import React from 'react'

type LayoutProps = {
  children: React.ReactChild[]
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-white antialiased lg:min-h-screen font-sans overflow-auto">
      <div className="flex">
        <div className="flex-1">
          <div className="bg-white mx-auto rounded w-full text-xs">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Layout
