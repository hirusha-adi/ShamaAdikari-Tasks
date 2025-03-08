import { isUserLoggedIn } from "../utils/pocketbase";

const Footer = () => {
  return (
    <>
      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - Shama Adikari</p>
        </aside>
      </footer>
    </>
  );
}

export { Footer }