import Link from "next/link";

const Card = ({ name, className, href }) => {
  return (
    <Link className={className} href={href}>
      {name}
    </Link>
  );
};

export default Card;
