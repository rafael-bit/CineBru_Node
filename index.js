const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 8080;
const cors = require('cors');
app.use(cors());


let filmes = {
		1:  {
			"id": 1,
			"titulo_original": "Oppenheimer",
			"titulo_traduzido": "Oppenheimer",
			"genero": "Biopic, Histórico, Suspense",
			"direcao": "Christopher Nolan",
			"pais_origem": "Estados Unidos",
			"idioma": "Português, Inglês",
			"legenda": "Português",
			"duracao": "180 min",
			"nota": 4.5,
			"lancamento": "20/07/2023",
			"sinopse": "Na Segunda Guerra Mundial, um grupo de cientistas participa de um projeto secreto para desenvolver as primeiras bombas atômicas.",
			"img": "../../assets/Oppenheimer.png"
		  },
		2:  {
			"id": 2,
			"titulo_original": "Barbie",
			"titulo_traduzido": "Barbie",
			"genero": "Comédia, Aventura, Família",
			"direcao": "Greta Gerwig",
			"pais_origem": "Estados Unidos",
			"idioma": "Português, Inglês",
			"legenda": "Espanhol",
			"duracao": "100 min",
			"nota": 4.1,
			"lancamento": "20/07/2023",
			"sinopse": "No mundo mágico das Barbies, uma das bonecas começa a perceber que não se encaixa como as outras, e acaba sendo banida para o mundo real com seu amado Ken.",
			"img": "../../assets/Barbie.png"
		  },
		3:  {
			"id": 3,
			"titulo_original": "Teenage Mutant Ninja Turtles: Mutant Mayhem",
			"titulo_traduzido": "As Tartarugas Ninjas: Caos Mutante",
			"genero": "Animação,  Ação, Aventura",
			"direcao": "Jeffrey Rowe",
			"pais_origem": "EUA",
			"idioma": "Português, Inglês",
			"legenda": "Português",
			"duracao": "100 minutos",
			"nota": 7.6,
			"lancamento": "2023-08-31",
			"sinopse": "Depois de anos sendo protegidos do mundo humano, os irmãos tartarugas saem para ganhar os corações dos nova yorkinos e serem aceitos como adolescentes normais através de seus atos heroicos.",
			"img": "../../assets/Tartaruga.png"
		  },
		4:  {
			"id": 4,
			"titulo_original": "The Nun II",
			"titulo_traduzido": "A Freira 2",
			"genero": "Mistério, Suspense, Terror",
			"direcao": "Michael Chaves",
			"pais_origem": "EUA",
			"idioma": "Português, Inglês",
			"legenda": "Português",
			"duracao": "110 minutos",
			"nota": 6.5,
			"lancamento": "2023-07-07",
			"sinopse": "Quatro anos após os acontecimentos na abadia de St. Carta, a Irmã Irene regressa mais uma vez e depara-se com a força demoníaca de Valak, a Freira.",
			"img": "../../assets/Freira.webp"
		  },
	  
		5:  {
			"id": 5,
			"titulo_original": "The Last Voyage of the Demeter Mayhem",
			"titulo_traduzido": "Drácula: A Última Viagem do Deméter",
			"genero": "Suspense, Terror",
			"direcao": "André Øvredal",
			"pais_origem": "EUA",
			"idioma": "Português, Inglês",
			"legenda": "Português",
			"duracao": "118 minutos",
			"nota": 6.1,
			"lancamento": "2023-08-24",
			"sinopse": "Inspirado na icônica lenda do vampiro Drácula, acompanhamos a terrível história do navio Deméter, que foi fretado para transportar cargas particulares.",
			"img": "../../assets/Dracula.jpg"
		  },
	  
		6: {
			"id": 6,
			"titulo_original": "Blue Beetle",
			"titulo_traduzido": "Besouro Azul",
			"genero": "Ação,  Ficção Científica",
			"direcao": "Angel Manuel Soto",
			"pais_origem": "EUA",
			"idioma": "Inglês, Português",
			"legenda": "Portugês",
			"duracao": "127 minutos",
			"nota": 7.2,
			"lancamento": "2023-08-17",
			"sinopse": "O jovem mexicano Jaime Reyes (Xolo Maridueña) que, recém-formado, volta para casa cheio de aspirações para o futuro.",
			"img": "../../assets/BesouroAzul.png"
		  },
		7:  {
			"id": 7,
			"titulo_original": "Golda",
			"titulo_traduzido": "Golda",
			"genero": "Aventura",
			"direcao": "Guy Nattiv",
			"pais_origem": "EUA",
			"idioma": "Inglês, Português",
			"legenda": "Português",
			"duracao": "100 minutos",
			"nota": 5.9,
			"lancamento": "2023-08-31",
			"sinopse": "Narra as decisões dramáticas e de alto risco que Golda Meir, primeira-ministra de Israel e primeira mulher a ocupar esse posto na nação, enfrentou durante a Guerra do Yom Kippur em 1973.",
			"img": "../../assets/Golda.jpg"
			},
		8:	{
			  "id": 8,
			  "titulo_original": "Gran Turismo",
			  "titulo_traduzido": "Gran Turismo - De Jogador a Corredor",
			  "genero": "Ação, Drama, Aventura",
			  "direcao": "Neill Blomkamp",
			  "pais_origem": "EUA",
			  "idioma": "Inglês, Português",
			  "legenda": "Português",
			  "duracao": "135 minutos",
			  "nota": 7.3,
			  "lancamento": "2023-08-24",
			  "sinopse": "Baseado na história de Jann Mardenborough, e relata a trajetória de um jogador de videogame que utilizou suas habilidades nos simuladores para se tornar um piloto profissional de verdade.",
			  "img": "../../assets/GranTurismo.png"
			  },
			9:  {
				"id": 9,
				"titulo_original": "O Porteiro",
				"titulo_traduzido": "O Porteiro",
				"genero": "Comédia",
				"direcao": "Paulo Fontenelle",
				"pais_origem": "Brasil",
				"idioma": "Português",
				"legenda": "S/ L",
				"duracao": "83 minutos",
				"nota": 7.0,
				"lancamento": "2023-08-31",
				"sinopse": "Na comédia O Porteiro, Confusão é o que não falta no prédio onde Waldisney (Alexandre Lino) trabalha como porteiro. Todo dia é um bafafá entre os vizinhos, mas ao lado da zeladora Rosivalda (Cacau Protásio), ele é craque em manter essa bagunça organizada. ",
				"img": "../../assets/Porteiro.webp"
			  }
};

app.get('/filmes', (req, res) => {
	res.json(Object.values(filmes));
});

app.get('/filmes/:id', (req, res) => {
	const filme = filmes[req.params.id];
	if (filme) {
		res.json(filme);
	} else {
		res.status(404).json({ error: 'Filme não encontrado' });
	}
});

app.post('/filmes', (req, res) => {
	const novoFilme = req.body;
	const id = Object.keys(filmes).length + 1;
	novoFilme.id = id;
	filmes[id] = novoFilme;
	res.status(201).json(novoFilme);
});

app.put('/filmes/:id', (req, res) => {
	const filmeId = req.params.id;
	const filmeAtualizado = req.body;
	filmeAtualizado.id = parseInt(filmeId);
	filmes[filmeId] = filmeAtualizado;
	res.json(filmeAtualizado);
});

app.delete('/filmes/:id', (req, res) => {
	const filmeId = req.params.id;
	delete filmes[filmeId];
	res.sendStatus(204);
});


app.listen(port, () => {
	console.log(`API do cinema rodando em http://localhost:${port}`);
});