const Footer = () => {
  return (
    <footer className="flex mt-10 justify-between items-center py-5">
      <p className="text-sm">
        Invoice App &copy; {new Date().getFullYear()}
      </p>
      <p className="text-sm">
        Created by Tumon with Nextjs, Supabse, and Clerk
      </p>
    </footer>
  )
}

export default Footer;
