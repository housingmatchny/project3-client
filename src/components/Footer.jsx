const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content justify-center sm:gap-24 sm:flex sm:grid-flow-col">
      <div className="mt-2">
        <p className="footer-title text-red-700">
          Disclaimer: This is a test site.
          <br />
        </p>
      </div>
      
      
      {/* <nav>
      <header className="footer-title">Services</header> 
      <a className="link link-hover">Branding</a>
      <a className="link link-hover">Design</a>
      <a className="link link-hover">Marketing</a>
      <a className="link link-hover">Advertisement</a>
    </nav> 
    <nav>
      <header className="footer-title">Company</header> 
      <a className="link link-hover">About us</a>
      <a className="link link-hover">Contact</a>
      <a className="link link-hover">Jobs</a>
      <a className="link link-hover">Press kit</a>
    </nav> 
    <nav>
      <header className="footer-title">Legal</header> 
      <a className="link link-hover">Terms of use</a>
      <a className="link link-hover">Privacy policy</a>
      <a className="link link-hover">Cookie policy</a>
    </nav>  */}

      <div>
      <span aria-label="Enter your email address to sign up for the newsletter"/>
        <header className="footer-title">Be the first to know</header>
        <fieldset className="form-control w-auto">
          {/* <label className="label">
          <span className="label-text">Enter your email address</span>
        </label>   */}
          <form
            action="https://gmail.us13.list-manage.com/subscribe/post"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            target="_blank"
            className="join"
          >
            <input
              type="email"
              name="EMAIL"
              id="mce-EMAIL"
              placeholder="username@site.com"
              className="email input input-bordered join-item"
              required
            />
            {/* Hidden fields for Mailchimp list details */}
            <input type="hidden" name="u" value="d63768e0fca2b8e0829e62ab5" />
            <input type="hidden" name="id" value="dc2edcc545" />
            <input type="hidden" name="f_id" value="00290ee4f0" />
            <button
              type="submit"
              className="validate btn btn-primary join-item"
            >
              Subscribe
            </button>
          </form>
        </fieldset>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold">
          HousingMatch, Inc.
          <br />
        </h3>
        <p>
          Made with <span aria-label="love">💜</span> in NYC
          <br />
        </p>
        <p>
          Illustrations from <a href="https://kit8.net/">Kit8</a>
          <br />
        </p>
        <p>Copyright © 2023 HousingMatch. All Rights Reserved.</p>
        
      </div>

    </footer>
  );
};

export default Footer;
