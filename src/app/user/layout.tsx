
 type IProps = {
  children: React.ReactNode
}

export default function UsersLayout({ children }: IProps) {
  return (
    <div>
      UsersLayout
      {children}
    </div>
  )
}