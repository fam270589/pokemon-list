import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import styles from "../../styles/Details.module.css";

// Static Site Generation
export async function getStaticProps({ params }) {
	const resp = await fetch(
		`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
	);

	return {
		props: {
			pokemon: await resp.json(),
		},
	};
}

export async function getStaticPaths() {
	const resp = await fetch(
		"https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
	);

	const pokemons = await resp.json();

	return {
		paths: pokemons.map((pokemon) => ({
			params: { id: pokemon.id.toString() },
		})),
		fallback: false,
	};
}

// // Server Side Rendering
// export async function getServerSideProps({ params }) {
// 	const resp = await fetch(
// 		`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
// 	);

// 	return {
// 		props: {
// 			pokemon: await resp.json(),
// 		},
// 	};
// }

//todo:-----Details component-----://
const Details = ({ pokemon }) => {
	// Client Side Rendering
	// const {
	// 	query: { id },
	// } = useRouter();

	// const [pokemon, setPokemon] = useState(null);

	// useEffect(() => {
	// 	const getPokemon = async () => {
	// 		const resp = await fetch(
	// 			`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
	// 		);

	// 		setPokemon(await resp.json());
	// 	};
	// 	if (id) {
	// 		getPokemon();
	// 	}

	// 	return () => {};
	// }, [id]);

	if (!pokemon) {
		return null;
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>{pokemon.name}</title>
			</Head>
			<div>
				<Link href="/">&larr; Back to Home</Link>
			</div>
			<div className={styles.layout}>
				<div>
					<Image
						priority
						className={styles.image}
						src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
						alt={pokemon.name}
						width={300}
						height={300}
					/>
				</div>
				<div className={styles.desc}>
					<div className={styles.title}>
						<div className={styles.name}>{pokemon.name}</div>
						<div className={styles.type}>{pokemon.type.join(", ")}</div>
					</div>
					<table className={styles.table}>
						<tbody>
							{pokemon.stats.map(({ name, value }) => (
								<tr key={name}>
									<td className={styles.attribute}>{name}</td>
									<td>{value}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Details;
