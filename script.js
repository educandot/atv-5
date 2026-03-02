document.getElementById('cepForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const rua = document.getElementById('rua').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;

    // Monta o endereço completo
    const endereco = `${rua}, ${cidade}, ${estado}`;

    // Codifica o endereço para a URL
    const enderecoFormatado = encodeURIComponent(endereco);

    // Substitua 'SUA_CHAVE_API_GOOGLE' pela sua chave da API do Google
    const apiKey = 'SUA_CHAVE_API_GOOGLE';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${enderecoFormatado}&key=${apiKey}`;

    // Limpa o resultado anterior
    document.getElementById('resultado').innerHTML = '';

    // Faz a requisição à API do Google
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'OK') {
                const resultado = data.results[0]; // Pega o primeiro resultado da busca

                // Procura o CEP (postal_code) nos componentes do endereço
                const cep = resultado.address_components.find(component =>
                    component.types.includes('postal_code')
                );

                if (cep) {
                    // Exibe o CEP encontrado
                    document.getElementById('resultado').innerHTML = `CEP: ${cep.long_name}`;
                    document.getElementById('resultado').className = 'success';
                } else {
                    // Se não encontrar o CEP
                    document.getElementById('resultado').innerHTML = 'CEP não encontrado para este endereço.';
                    document.getElementById('resultado').className = 'error';
                }
            } else {
                // Caso a API retorne um erro
                document.getElementById('resultado').innerHTML = 'Erro ao buscar o endereço. Verifique os dados.';
                document.getElementById('resultado').className = 'error';
            }
        })
        .catch(error => {
            // Se ocorrer algum erro durante a requisição
            document.getElementById('resultado').innerHTML = 'Erro ao fazer a requisição.';
            document.getElementById('resultado').className = 'error';
        });
});