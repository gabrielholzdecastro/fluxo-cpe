const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'fluxo_cpe',
    password: 'elerp',
    port: 5432,
})

const getProcessos = (request, response) => {
    pool.query('SELECT * FROM processo WHERE concluido IS NULL ORDER BY adicionado', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createProcesso = (request, response) => {
    const { numero, ano, programador } = request.body

    pool.query(
        'INSERT INTO processo (id, numero, ano, programador, testador, concluido, adicionado) VALUES (gen_random_uuid(), $1, $2, $3, NULL, NULL, NOW()) RETURNING id',
        [numero, ano, programador],
        (error, results) => {
            if (error) {
                throw error
            }
            const createdId = results.rows[0].id;
            response.status(201).send(`User added with ID: ${createdId}`);
        })
}

const adicionarTestador = (request, response) => {
    const id = parseInt(request.params.id)
    const testador = request.body

    pool.query(
        'UPDATE processo SET testador = $1 WHERE id = $2',
        [testador, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`User added with ID: ${id}`);
        }
    )
}

module.exports = {
    getProcessos,
    createProcesso,
    adicionarTestador,
}