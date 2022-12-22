import Image from "next/image";
import Link from "next/link";

import styles from "./Card.module.css";

//todo:-----Card component-----://
const Card = (props) => {
	return (
		<div className={styles.container}>
			<Link href={`/pokemon/${props.id}`}>
				<div className={styles.linkWrapper}>
					<Image
						priority
						className={styles.image}
						src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${props.image}`}
						alt={props.name}
						width={300}
						height={300}
					/>
					<h3>{props.name}</h3>
				</div>
			</Link>
		</div>
	);
};

export default Card;
