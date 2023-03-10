import Head from "next/head";
import { useState, useEffect } from "react";

import styles from "../styles/Home.module.css";
import Card from "../components/Card";

// Static Site Generation
export async function getStaticProps(context) {
	const resp = await fetch(
		"https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
	);

	return {
		props: {
			pokemons: await resp.json(),
		},
	};
}

// // Server Side Rendering
// export async function getServerSideProps(context) {
// 	const resp = await fetch(
// 		"https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
// 	);

// 	return {
// 		props: {
// 			pokemons: await resp.json(),
// 		},
// 	};
// }

export default function Home({ pokemons }) {
	// Client Side Rendering
	// const [pokemons, setPokemons] = useState([]);

	// useEffect(() => {
	// 	const getPokemon = async () => {
	// 		const resp = await fetch(
	// 			"https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
	// 		);

	// 		setPokemons(await resp.json());
	// 	};

	// 	getPokemon();

	// 	return () => {};
	// }, []);

	return (
		<div className={styles.container}>
			<Head>
				<title>Pokemon List</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h2>Pokemon List</h2>
				<div className={styles.grid}>
					{pokemons.map((pokemon) => (
						<Card
							key={pokemon.id}
							id={pokemon.id}
							image={pokemon.image}
							name={pokemon.name}
						/>
					))}
				</div>
			</main>

			<footer className={styles.footer}>fam @2022</footer>
		</div>
	);
}
