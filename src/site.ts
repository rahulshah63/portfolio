// Everything the home page says lives here. Edit this file to update the site.

import type { SketchName } from './sketches';

export const site = {
	url: 'https://www.rahul-shah.com.np',
	name: 'Rahul Shah',
	role: 'Full-stack and blockchain engineer',
	description:
		'Rahul Shah is a full-stack and blockchain engineer from Nepal, building DeFi, on-chain data and Web3 products.',
	intro:
		'Full-stack and blockchain engineer from Nepal with 4+ years shipping DeFi, DEX, on-chain indexing and Web3 game products across Story, Sui, Aleo and EVM chains. Most recently I built Elitra, an onchain asset-management and personal finance platform.',
	email: 'rahulshah.career@gmail.com',
	cv: '/rahul-shah-cv.pdf',
	links: {
		github: 'https://github.com/rahulshah63',
		linkedin: 'https://www.linkedin.com/in/rahul-shah63/',
		x: 'https://x.com/rahulshah_63',
		instagram: 'https://www.instagram.com/_rahul_.sh',
		facebook: 'https://www.facebook.com/rahul.shah.34337',
	},
};

export type Role = {
	company: string;
	url?: string;
	title?: string;
	period: string;
	// May contain inline <a> links.
	summary: string;
};

export const work: Role[] = [
	{
		company: 'Elitra',
		url: 'https://elitra.xyz',
		period: 'Jul 2025 - Present',
		summary:
			'Onchain asset management, from NAV tracking of third-party vaults to personal finance. Modular execution units for DCA, swaps, buys and sells across stocks, crypto and commodities, with AI-recommended portfolio actions.',
	},
	{
		company: 'Storyhunt',
		url: 'https://storyhunt.xyz',
		period: 'Aug 2024 - Jul 2025',
		summary:
			'A permissionless DEX on Story Chain, backed by Story Foundation. Owned the contracts, backend and indexing, including a smart order router, Uniswap v3-style concentrated liquidity and The Graph subgraphs.',
	},
	{
		company: 'Infinite Seas',
		url: 'https://infiniteseas.io',
		period: 'Jul 2024 - Aug 2024',
		summary:
			'A 2D strategy Web3 game with on-chain assets, built with Phaser and MUD. Sea navigation and real-world map gameplay.',
	},
	{
		company: 'Venture23',
		url: 'https://www.venture23.io',
		title: 'Full-stack and blockchain engineer',
		period: 'Aug 2022 - Jul 2025',
		summary:
			'Frontend, backend and smart contracts across Sui, Aleo, Icon and EVM for Anichess, Gangstaverse and Vendetta. Aleo bridging (Verulink) and lending (Verulend), and real-time game systems with Three.js and WebSockets.',
	},
	{
		company: 'LIS Nepal',
		url: 'https://lisnepal.com.np',
		title: 'Data engineering intern',
		period: 'Aug 2022 - Feb 2023',
		summary:
			'Data engineering and visualization with Snowflake, Power BI and Tableau. Assisted on NLP, database management, ETL and business intelligence projects.',
	},
	{
		company: 'iBriz.ai',
		url: 'https://ibriz.ai',
		title: 'Frontend intern',
		period: 'Mar 2022 - Jul 2022',
		summary:
			'Frontend for the ICE Crowd Loan and Airdrop, using the Polkadot SDK for interoperability across the ICE and SNOW blockchain ecosystem.',
	},
	{
		company: 'Freelance',
		title: 'Smart contract developer',
		period: 'Jan 2022 - Apr 2022',
		summary:
			'Developed and deployed game logic and marketplace smart contracts for a blockchain game, and built automated trading bots for arbitrage and liquidity provision on Uniswap, Raydium and Kamino Finance.',
	},

];

// Soft background colors for project tiles.
const tones = {
	oat: '#e3dacc',
	cactus: '#bcd1ca',
	heather: '#cbcadb',
	coral: '#ebcece',
	peach: '#ebc9b7',
	mist: '#c6d6e4',
};

// A link without `href` is shown as plain text.
type Link = { label: string; href?: string };

export type Project = {
	name: string;
	summary: string;
	sketch: SketchName;
	// A real logo to show instead of the drawing (see components/BrandLogo.astro).
	logo?: 'storyhunt' | 'aleo';
	tone: string;
	links: Link[];
};

// Featured on cards with a drawing.
export const projects: Project[] = [
	{
		name: 'Elitra',
		sketch: 'chart',
		tone: tones.oat,
		summary:
			'Onchain asset management and personal finance: NAV tracking of vaults, modular execution for DCA, swaps, buys and sells, and AI-recommended portfolio actions.',
		links: [{ label: 'elitra.xyz', href: 'https://elitra.xyz' }],
	},
	{
		name: 'Storyhunt',
		sketch: 'swap',
		logo: 'storyhunt',
		tone: tones.peach,
		summary:
			'Permissionless DEX on Story Chain with a smart order router, Uniswap v3-style concentrated liquidity and The Graph subgraphs.',
		links: [
			{ label: 'storyhunt.xyz', href: 'https://storyhunt.xyz' },
			{ label: 'SDKs on npm', href: 'https://www.npmjs.com/search?q=%40storyhunt' },
		],
	},

	{
		name: 'Aleo',
		sketch: 'bridge',
		logo: 'aleo',
		tone: tones.mist,
		summary:
			'Verulink, a bridge moving assets between Ethereum and Aleo; Verulend, a lending protocol; and an open-source Aleo indexer CLI and framework.',
		links: [
			{ label: 'Verulink', href: 'https://www.verulink.com' },
			{ label: 'Indexer on npm', href: 'https://www.npmjs.com/package/aleo-indexer-service' },
			{ label: 'GitHub', href: 'https://github.com/rahulshah63/aleo-indexer-service' },
		],
	},
	{
		name: 'Koseli',
		sketch: 'gift',
		tone: tones.heather,
		summary:
			'Community platform on Sui with a referral and quest system for 10K+ daily users, and gift cards demoed at the Paris Sui conference.',
		links: [{ label: 'npm', href: 'https://www.npmjs.com/package/@venture23/koseli-referral' }],
	},
	{
		name: 'Web3 games',
		sketch: 'controller',
		tone: tones.cactus,
		summary:
			'Game mechanics, on-chain assets and real-time systems with Phaser, MUD, Three.js and WebSockets, for my own games and client games at Venture23.',
		links: [
			{ label: 'Infinite Seas', href: 'https://infiniteseas.io' },
			{ label: 'Wonder Game' },
			{ label: 'Anichess', href: 'https://anichess.com' },
			{ label: 'Gangstaverse', href: 'https://gangstaverse.co' },
			{ label: 'Vendetta', href: 'https://vendettagame.xyz' },
		],
	},

	{
		name: 'Shruti',
		sketch: 'audiobook',
		tone: tones.coral,
		summary: 'Nepali audiobook app with Tacotron2 and HiFi-GAN text-to-speech. My major project, presented at SIGUL 2023.',
		links: [
			{ label: 'GitLab', href: 'https://gitlab.com/shrutiaudio' },
			{ label: 'Dataset', href: 'https://www.openslr.org/143/' },
			{ label: 'Audio samples', href: 'https://shruti-audios.netlify.app/' },
		],
	},
];

// Coursework and degree projects, listed under Education.
export const academicProjects: { name: string; summary: string; links: Link[] }[] = [
	{
		name: 'D-Shelf',
		summary:
			'Minor project: decentralized book publishing on blockchain and IPFS, using NFTs against royalty theft. I worked on the smart contracts, UI design, frontend and integration. Hardhat, React, IPFS, ethers.js, AES/SHA.',
		links: [
			{ label: 'GitHub', href: 'https://github.com/rahulshah63/D-Shelf' },
			{ label: 'Paper', href: 'https://old.kec.edu.np/wp-content/uploads/2022/12/KEC-Conference-Proceeding-2022new.pdf#page=33' },
		],
	},
	{
		name: 'Log Tracker',
		summary:
			"MERN web app for tracking progress on bachelor's projects and master's theses. I built it full-stack with Express, Bootstrap, MongoDB and Passport.js authentication.",
		links: [{ label: 'GitHub', href: 'https://github.com/rahulshah63/LogTracker' }],
	},
	{
		name: 'Chat Over LAN',
		summary: "Terminal chat app for messaging inside an organization's network, built with sockets in C++.",
		links: [{ label: 'GitHub', href: 'https://github.com/rahulshah63/ChatApplicationCpp' }],
	},
	{
		name: 'Airbus A380 Modeling',
		summary: 'Computer graphics project rendering a Blender airplane model with OpenGL in Python.',
		links: [{ label: 'GitHub', href: 'https://github.com/rahulshah63/A380-Modeling--A-Computer-Graphics-Project' }],
	},
	{
		name: 'Covid-19 Tracker',
		summary:
			'DSA project: a GUI showing Covid-19 data by country and category, built with SFML, merge sort on linked lists and binary search.',
		links: [{ label: 'GitHub', href: 'https://github.com/rahulshah63/Covid-19-Tracker' }],
	},
	{
		name: 'Real-time sales prediction',
		summary: 'End-to-end data pipeline predicting purchase totals from live sales data, with Apache Kafka on AWS.',
		links: [{ label: 'GitHub', href: 'https://github.com/rahulshah63/Big-Data-Science' }],
	},
];

// Charities I built websites and portals for.
export const nonprofits: Project[] = [
	{
		name: 'Aarambha Foundation',
		sketch: 'seedling',
		tone: tones.cactus,
		summary:
			'Finds children in Nepal who have left school and brings them back, covering fees, supplies and support. A registered NGO (Reg. 54/072/073) with the Social Welfare Council.',
		links: [
			{ label: 'Website', href: 'https://aarambhafoundation.org.np' },
			{ label: 'Portal', href: 'https://aarambhafoundation.org.np/portal' },
		],
	},
	{
		name: 'Hope4Smile',
		sketch: 'heart',
		tone: tones.mist,
		summary:
			'Volunteer-led UK charity supporting education, healthcare, clean water, food relief, safeguarding and opportunity in more than 25 countries.',
		links: [{ label: 'Website', href: 'https://hope4smile.org' }],
	},
];

export const education = [
	{
		degree: "Bachelor's in Computer Engineering",
		school: 'IOE Pulchowk Campus, Tribhuvan University, Lalitpur',
		period: '2018 - 2022',
		highlights: [
			'Winner, LOCUS 2021 Hack-A-Week',
			'Vice President, ESAJ Pulchowk',
			'Pre-event organizer, LOCUS 2020',
			'Golden Jubilee Scholarship 2018/19',
		],
	},
	{
		degree: '+2 Science, Higher Secondary Education',
		school: 'Shikshadeep College, Biratnagar',
		period: '2016 - 2018',
		highlights: [
			'Recognized for outstanding performance in both class 11 and 12',
			'Mahatma Gandhi Scholarship 2016/17, awarded by the Indian Embassy',
		],
	},
];

export const papers: { title: string; venue: string; year: string; href: string }[] = [
	{
		title: 'Nepali Text-to-Speech Synthesis using Tacotron2 for Melspectrogram Generation',
		venue: 'SIGUL 2023, paper presentation',
		year: '2023',
		href: 'https://www.isca-archive.org/sigul_2023/khadka23_sigul.html',
	},
	{
		title: 'Decentralized Book Publishing Platform using Blockchain and IPFS: An NFT-based Solution to Royalty Theft',
		venue: '4th International KEC Conference',
		year: '2022',
		href: 'https://old.kec.edu.np/wp-content/uploads/2022/12/KEC-Conference-Proceeding-2022new.pdf#page=33',
	},
];

// To link a certificate, put the file in public/certificates/ and set `href`, e.g. '/certificates/e-satya.pdf'.
export const awards: { title: string; detail: string; year?: string; href?: string }[] = [
	{ title: 'E-Satya Blockchain Fellowship', detail: 'Fellow', year: '2022' },
	{ title: 'IWEEE', detail: 'Participant, 7th and 8th editions', year: '2021, 2022' },
	{ title: 'LOCUS Hack-A-Week', detail: 'Winner', year: '2021' },
	{ title: 'AI Fellowship Programme', detail: 'Fellow', year: '2018' },
];
