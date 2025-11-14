import Button from "./common/Button";

const FooterNewsletter = () => {
  return (
    <div className="text-ash-grey flex flex-col gap-2">
      <p className="text-camel-tan text-2xl font-semibold">
        Sign up to our Newsletter
      </p>
      <p>Updates on everything new at Bharata Darshana.</p>
      <input
        placeholder="Your email address"
        className="mt-2 max-w-[500px] border px-2 py-3 outline-none"
        type="email"
      />
      <Button className="mt-2 w-fit">Subscribe</Button>
    </div>
  );
};

export default FooterNewsletter;
