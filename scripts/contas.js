const inquirer = require('inquirer');
async function getValues(isAnna = true) {
    const perguntas = [
        {
            type: 'input',
            name: 'salarioPrimeiraPessoa',
            message: 'Salário da primeira pessoa (Eduardo):',
            validate: (input) => input === '' || (!isNaN(input) && input >= 0) || 'Por favor, insira um valor válido.',
            filter: (input) => input === '' ? 0 : parseFloat(input)
        },
        {
            type: 'input',
            name: 'salarioSegundaPessoa',
            message: 'Salário da segunda pessoa (Anna):',
            validate: (input) => input === '' || (!isNaN(input) && input >= 0) || 'Por favor, insira um valor válido.',
            filter: (input) => input === '' ? 0 : parseFloat(input)
        },
        {
            type: 'input',
            name: 'mercado',
            message: 'Valor do mercado:',
            validate: (input) => !isNaN(input) && input >= 0 || 'Por favor, insira um valor válido.'
        },
        {
            type: 'input',
            name: 'aluguel',
            message: 'Valor do aluguel:',
            validate: (input) => !isNaN(input) && input >= 0 || 'Por favor, insira um valor válido.'
        },
        {
            type: 'input',
            name: 'luz',
            message: 'Valor da luz:',
            validate: (input) => !isNaN(input) && input >= 0 || 'Por favor, insira um valor válido.'
        },
        {
            type: 'input',
            name: 'condominio',
            message: 'Valor do condomínio:',
            validate: (input) => !isNaN(input) && input >= 0 || 'Por favor, insira um valor válido.'
        },
        {
            type: 'input',
            name: 'internet',
            message: 'Valor da internet:',
            validate: (input) => !isNaN(input) && input >= 0 || 'Por favor, insira um valor válido.'
        },
    ];

    const respostas = await inquirer.prompt(perguntas);

    calcularValores(respostas, isAnna);
}

function calcularValores(respostas, isAnna) {
    const { salarioPrimeiraPessoa, salarioSegundaPessoa, mercado, aluguel, luz, condominio, internet } = respostas;

    const CASTELINHO = 34.685; // Valor fixo
    const GUARDA_ROUPA = 102.47; // Valor fixo

    const METADE_MERCADO = (parseFloat(mercado) / 2);

    const TOTAL_CONTAS = parseFloat(aluguel) + parseFloat(luz) + parseFloat(condominio) + parseFloat(internet);
    const TOTAL_RENDA = parseFloat(salarioPrimeiraPessoa) + parseFloat(salarioSegundaPessoa);


    let RENDA_PERCENTUAL_PRIMEIRA_PESSOA = 0.54;
    let RENDA_PERCENTUAL_SEGUNDA_PESSOA = 0.46;

    if (salarioPrimeiraPessoa && salarioSegundaPessoa) {
        RENDA_PERCENTUAL_PRIMEIRA_PESSOA = parseFloat(salarioPrimeiraPessoa) / TOTAL_RENDA;
        RENDA_PERCENTUAL_SEGUNDA_PESSOA = parseFloat(salarioSegundaPessoa) / TOTAL_RENDA;
    }

    const VALOR_PRIMEIRA_PESSOA = RENDA_PERCENTUAL_PRIMEIRA_PESSOA * TOTAL_CONTAS;

    const VALOR_SEGUNDA_PESSOA = (RENDA_PERCENTUAL_SEGUNDA_PESSOA * TOTAL_CONTAS);

    const VALOR_TOTAL_SEGUNDA_PESSOA = VALOR_SEGUNDA_PESSOA + METADE_MERCADO + CASTELINHO + GUARDA_ROUPA;

    console.log(`TOTAL: R$${parseFloat(VALOR_PRIMEIRA_PESSOA + VALOR_SEGUNDA_PESSOA).toFixed(2)}`)
    console.log(`Valor de Eduardo: R$${VALOR_PRIMEIRA_PESSOA.toFixed(2)}`);
    console.log(`Valor de Anna: R$${VALOR_TOTAL_SEGUNDA_PESSOA.toFixed(2)} \nMês: R$${parseFloat(VALOR_SEGUNDA_PESSOA).toFixed(2)}, Mercado: R$${METADE_MERCADO}, Castelinho e Guarda Roupa: R$${CASTELINHO} + R$${GUARDA_ROUPA}`);
}

getValues();