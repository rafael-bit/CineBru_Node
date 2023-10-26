const express = require('express');
const app = express();
const port = 8080;
require('dotenv').config();
const mysql = require('mysql2');
const connection = mysql.createConnection(process.env.DATABASE_URL);
console.log('Connected to PlanetScale!');
connection.end();

let assentos = {
	1: { id: 1, disponivel: true },
	2: { id: 2, disponivel: false },
};

let salas = {
	1: { id: 1, nome: 'Sala 1' },
	2: { id: 2, nome: 'Sala 2' },
};

let exibicoes = {
	1: { id: 1, salaId: 1, filme: 'Vingadore: EndGame', horario: '14:00' },
	2: { id: 2, salaId: 2, filme: 'V de vingança', horario: '16:30' },
};

let filmes = {
	1: { id: 1, titulo: 'Vingadore: EndGame', diretor: 'Anthony Russo, Joe Russo', genero: 'Ação', duracao: '120 minutos' },
	2: { id: 2, titulo: 'V de vingança', diretor: 'James, McTeigue', genero: 'Ação', duracao: '105 minutos' },
};

app.use(express.json());

app.get('/salas', (req, res) => {
	res.json(Object.values(salas));
});

app.get('/salas/:id', (req, res) => {
	const sala = salas[req.params.id];
	if (sala) {
		res.json(sala);
	} else {
		res.status(404).json({ error: 'Sala não encontrada' });
	}
});

app.post('/salas', (req, res) => {
	const novaSala = req.body;
	const id = Object.keys(salas).length + 1;
	novaSala.id = id;
	salas[id] = novaSala;
	res.status(201).json(novaSala);
});

app.put('/salas/:id', (req, res) => {
	const salaId = req.params.id;
	const salaAtualizada = req.body;
	salaAtualizada.id = parseInt(salaId);
	salas[salaId] = salaAtualizada;
	res.json(salaAtualizada);
});

app.delete('/salas/:id', (req, res) => {
	const salaId = req.params.id;
	delete salas[salaId];
	res.sendStatus(204);
});

app.get('/exibicoes', (req, res) => {
	res.json(Object.values(exibicoes));
});

app.get('/exibicoes/sala/:id', (req, res) => {
	const salaId = parseInt(req.params.id);
	const exibicoesSala = Object.values(exibicoes).filter(
		(exibicao) => exibicao.salaId === salaId
	);
	res.json(exibicoesSala);
});

app.post('/exibicoes', (req, res) => {
	const novaExibicao = req.body;
	const id = Object.keys(exibicoes).length + 1;
	novaExibicao.id = id;
	exibicoes[id] = novaExibicao;
	res.status(201).json(novaExibicao);
});

app.put('/exibicoes/:id', (req, res) => {
	const exibicaoId = req.params.id;
	const exibicaoAtualizada = req.body;
	exibicaoAtualizada.id = parseInt(exibicaoId);
	exibicoes[exibicaoId] = exibicaoAtualizada;
	res.json(exibicaoAtualizada);
});

app.delete('/exibicoes/:id', (req, res) => {
	const exibicaoId = req.params.id;
	delete exibicoes[exibicaoId];
	res.sendStatus(204);
});

app.get('/assentos/sala/:id', (req, res) => {
	const salaId = parseInt(req.params.id);
	const assentosDisponiveis = Object.values(assentos).filter(
		(assento) => assento.disponivel && assento.salaId === salaId
	);
	res.json(assentosDisponiveis);
});

app.put('/assentos/:id', (req, res) => {
	const assentoId = req.params.id;
	const novoStatus = req.body.disponivel;
	if (assentos[assentoId]) {
		assentos[assentoId].disponivel = novoStatus;
		res.json(assentos[assentoId]);
	} else {
		res.status(404).json({ error: 'Assento não encontrado' });
	}
});

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