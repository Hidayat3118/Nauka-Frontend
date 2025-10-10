import Link from "next/link";

const CardWarna = ({ name, className, href }) => {
  return (
    <Link className={className} href={href}>
      {name}
    </Link>
  );
};

export default CardWarna;
