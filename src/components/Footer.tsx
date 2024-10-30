const Footer = () => {
  return (
    <footer className="md:flex mt-10 justify-between items-center py-1 md:py-5">
      <p className="text-sm text-center">
        Invoice App &copy; {new Date().getFullYear()}
      </p>
      <p className="text-sm text-center">
        Created by Tumon with Nextjs, Supabse, and Clerk
      </p>
    </footer>
  )
}

export default Footer;
