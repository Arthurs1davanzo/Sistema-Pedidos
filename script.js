// Sistema de Gerenciamento - Script Principal
// Gerencia o armazenamento local e as funcionalidades compartilhadas entre as páginas

// Funções de inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeDatabase();
    setupEventListeners();
    loadData();
    setupBackButton();
});

// Inicializa o banco de dados local se não existir
function initializeDatabase() {
    // Dados de categorias
    if (!localStorage.getItem('categorias')) {
        const categorias = [
            { id: 1, descricao: 'Eletrônicos' },
            { id: 2, descricao: 'Livros' },
            { id: 3, descricao: 'Vestuário' }
        ];
        localStorage.setItem('categorias', JSON.stringify(categorias));
    }

    // Dados de UFs
    if (!localStorage.getItem('ufs')) {
        const ufs = [
            { id: 1, sigla: 'SP', descricao: 'São Paulo' },
            { id: 2, sigla: 'RJ', descricao: 'Rio de Janeiro' },
            { id: 3, sigla: 'MG', descricao: 'Minas Gerais' },
            { id: 4, sigla: 'RS', descricao: 'Rio Grande do Sul' }
        ];
        localStorage.setItem('ufs', JSON.stringify(ufs));
    }

    // Dados de cidades
    if (!localStorage.getItem('cidades')) {
        const cidades = [
            { id: 1, uf_id: 1, descricao: 'São Paulo' },
            { id: 2, uf_id: 1, descricao: 'Campinas' },
            { id: 3, uf_id: 2, descricao: 'Rio de Janeiro' },
            { id: 4, uf_id: 3, descricao: 'Belo Horizonte' }
        ];
        localStorage.setItem('cidades', JSON.stringify(cidades));
    }

    // Dados de clientes
    if (!localStorage.getItem('clientes')) {
        const clientes = [
            { id: 1, nome: 'João Silva', cpf: '123.456.789-10', telefone: '(11) 98765-4321', email: 'joao@email.com', endereco: 'Av. Paulista, 1000', uf_id: 1, cidade_id: 1, cep: '01310-100' },
            { id: 2, nome: 'Maria Oliveira', cpf: '987.654.321-00', telefone: '(21) 98765-1234', email: 'maria@email.com', endereco: 'Rua Copacabana, 500', uf_id: 2, cidade_id: 3, cep: '22020-001' },
            { id: 3, nome: 'Carlos Santos', cpf: '456.789.123-20', telefone: '(31) 91234-5678', email: 'carlos@email.com', endereco: 'Rua Savassi, 200', uf_id: 3, cidade_id: 4, cep: '30130-151' }
        ];
        localStorage.setItem('clientes', JSON.stringify(clientes));
    }

    // Dados de produtos
    if (!localStorage.getItem('produtos')) {
        const produtos = [
            { id: 1, referencia: 'SP001', descricao: 'Smartphone XYZ', categoria_id: 1, preco: 1599.90, estoque: 15 },
            { id: 2, referencia: 'LV005', descricao: 'Livro Clean Code', categoria_id: 2, preco: 89.90, estoque: 30 },
            { id: 3, referencia: 'VS100', descricao: 'Camiseta Básica', categoria_id: 3, preco: 49.90, estoque: 50 }
        ];
        localStorage.setItem('produtos', JSON.stringify(produtos));
    }

    // Dados de pedidos
    if (!localStorage.getItem('pedidos')) {
        const pedidos = [
            { id: 1001, cliente_id: 1, data: '2025-05-01', valor_total: 1779.70, status: 'Pendente', 
              itens: [
                { id: 1, produto_id: 1, referencia: 'SP001', descricao: 'Smartphone XYZ', quantidade: 1, valor_unitario: 1599.90, total: 1599.90 },
                { id: 2, produto_id: 2, referencia: 'LV005', descricao: 'Livro Clean Code', quantidade: 2, valor_unitario: 89.90, total: 179.80 }
              ]
            },
            { id: 1000, cliente_id: 2, data: '2025-04-30', valor_total: 2150.00, status: 'Concluído',
              itens: [
                { id: 1, produto_id: 1, referencia: 'SP001', descricao: 'Smartphone XYZ', quantidade: 1, valor_unitario: 1599.90, total: 1599.90 },
                { id: 3, produto_id: 3, referencia: 'VS100', descricao: 'Camiseta Básica', quantidade: 11, valor_unitario: 49.90, total: 548.90 }
              ]
            },
            { id: 999, cliente_id: 3, data: '2025-04-29', valor_total: 589.70, status: 'Cancelado',
              itens: [
                { id: 1, produto_id: 3, referencia: 'VS100', descricao: 'Camiseta Básica', quantidade: 10, valor_unitario: 49.90, total: 499.00 },
                { id: 2, produto_id: 2, referencia: 'LV005', descricao: 'Livro Clean Code', quantidade: 1, valor_unitario: 89.90, total: 89.90 }
              ]
            }
        ];
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
    }

    // Contadores para IDs
    if (!localStorage.getItem('id_counter')) {
        const id_counter = {
            categorias: 3,
            ufs: 4,
            cidades: 4,
            clientes: 3,
            produtos: 3,
            pedidos: 1001,
            itens_pedido: 2
        };
        localStorage.setItem('id_counter', JSON.stringify(id_counter));
    }
}

// Obtém o próximo ID para uma entidade específica
function getNextId(entity) {
    const counters = JSON.parse(localStorage.getItem('id_counter'));
    counters[entity]++;
    localStorage.setItem('id_counter', JSON.stringify(counters));
    return counters[entity];
}

// Configurar o botão voltar em todas as páginas
function setupBackButton() {
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'menu-principal.html';
        });
    }
}

// Configurar listeners de eventos de acordo com a página atual
function setupEventListeners() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Menu principal
    if (currentPage === 'menu-principal.html' || currentPage === '') {
        setupMenuLinks();
    }
    // Categorias
    else if (currentPage === 'cadastro-categorias.html') {
        setupCategoriasEvents();
    }
    // UFs
    else if (currentPage === 'cadastro-ufs.html') {
        setupUfsEvents();
    }
    // Cidades
    else if (currentPage === 'cadastro-cidades.html') {
        setupCidadesEvents();
    }
    // Clientes
    else if (currentPage === 'cadastro-clientes.html') {
        setupClientesEvents();
    }
    // Produtos
    else if (currentPage === 'cadastro-produtos.html') {
        setupProdutosEvents();
    }
    // Pedidos
    else if (currentPage === 'tela-pedidos.html') {
        setupPedidosEvents();
    }
}

// Configurar links no menu principal
function setupMenuLinks() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = item.querySelector('h3').textContent;
            
            switch(title) {
                case 'Cadastro de Categorias':
                    window.location.href = 'cadastro-categorias.html';
                    break;
                case 'Cadastro de UF':
                    window.location.href = 'cadastro-ufs.html';
                    break;
                case 'Cadastro de Cidades':
                    window.location.href = 'cadastro-cidades.html';
                    break;
                case 'Cadastro de Produtos':
                    window.location.href = 'cadastro-produtos.html';
                    break;
                case 'Cadastro de Clientes':
                    window.location.href = 'cadastro-clientes.html';
                    break;
                case 'Pedidos':
                    window.location.href = 'tela-pedidos.html';
                    break;
            }
        });
    });

    // Configurar botão sair
    const btnSair = document.querySelector('.btn-danger');
    if (btnSair) {
        btnSair.addEventListener('click', function() {
            if (confirm('Deseja realmente sair do sistema?')) {
                alert('Você saiu do sistema!');
            }
        });
    }
}

// Carregar dados de acordo com a página atual
function loadData() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'cadastro-categorias.html') {
        loadCategorias();
    }
    else if (currentPage === 'cadastro-ufs.html') {
        loadUfs();
    }
    else if (currentPage === 'cadastro-cidades.html') {
        loadCidades();
        populateUfSelect();
    }
    else if (currentPage === 'cadastro-clientes.html') {
        loadClientes();
        populateUfSelectForClientes();
    }
    else if (currentPage === 'cadastro-produtos.html') {
        loadProdutos();
        populateCategoriaSelect();
    }
    else if (currentPage === 'tela-pedidos.html') {
        loadPedidos();
        populateClienteSelect();
        if (getPedidoAtual()) {
            loadPedidoAtual();
        }
    }
}

// === FUNÇÕES PARA CATEGORIAS ===

// Carregar categorias na tabela
function loadCategorias() {
    const categorias = JSON.parse(localStorage.getItem('categorias'));
    const tbody = document.querySelector('.data-grid tbody');
    
    if (tbody) {
        tbody.innerHTML = '';
        
        categorias.forEach(categoria => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${categoria.id}</td>
                <td>${categoria.descricao}</td>
            `;
            
            tr.addEventListener('click', function() {
                document.getElementById('categoria-id').value = categoria.id;
                document.getElementById('categoria-descricao').value = categoria.descricao;
            });
            
            tbody.appendChild(tr);
        });
    }
}

// Configurar eventos para a página de categorias
function setupCategoriasEvents() {
    const btnNovo = document.querySelector('.btn-primary');
    const btnEditar = document.querySelector('.btn-warning');
    const btnGravar = document.querySelector('.btn-success');
    const btnExcluir = document.querySelector('.btn-danger');
    const btnSair = document.querySelector('.btn-secondary');
    
    let isEditing = false;
    
    // Botão Novo
    btnNovo.addEventListener('click', function() {
        document.getElementById('categoria-id').value = '';
        document.getElementById('categoria-descricao').value = '';
        isEditing = false;
    });
    
    // Botão Editar
    btnEditar.addEventListener('click', function() {
        const id = document.getElementById('categoria-id').value;
        if (!id) {
            alert('Selecione uma categoria para editar!');
            return;
        }
        isEditing = true;
        document.getElementById('categoria-descricao').focus();
    });
    
    // Botão Gravar
    btnGravar.addEventListener('click', function() {
        const id = document.getElementById('categoria-id').value;
        const descricao = document.getElementById('categoria-descricao').value;
        
        if (!descricao) {
            alert('Preencha a descrição da categoria!');
            return;
        }
        
        const categorias = JSON.parse(localStorage.getItem('categorias'));
        
        if (isEditing) {
            // Editar categoria existente
            const index = categorias.findIndex(c => c.id == id);
            if (index !== -1) {
                categorias[index].descricao = descricao;
                localStorage.setItem('categorias', JSON.stringify(categorias));
                alert('Categoria atualizada com sucesso!');
            }
        } else {
            // Nova categoria
            const novaCategoria = {
                id: getNextId('categorias'),
                descricao: descricao
            };
            
            categorias.push(novaCategoria);
            localStorage.setItem('categorias', JSON.stringify(categorias));
            alert('Categoria cadastrada com sucesso!');
        }
        
        loadCategorias();
        document.getElementById('categoria-id').value = '';
        document.getElementById('categoria-descricao').value = '';
        isEditing = false;
    });
    
    // Botão Excluir
    btnExcluir.addEventListener('click', function() {
        const id = document.getElementById('categoria-id').value;
        
        if (!id) {
            alert('Selecione uma categoria para excluir!');
            return;
        }
        
        if (confirm('Deseja realmente excluir esta categoria?')) {
            const categorias = JSON.parse(localStorage.getItem('categorias'));
            const filteredCategorias = categorias.filter(c => c.id != id);
            
            localStorage.setItem('categorias', JSON.stringify(filteredCategorias));
            alert('Categoria excluída com sucesso!');
            
            loadCategorias();
            document.getElementById('categoria-id').value = '';
            document.getElementById('categoria-descricao').value = '';
        }
    });
    
    // Botão Sair
    btnSair.addEventListener('click', function() {
        window.location.href = 'menu-principal.html';
    });
}

// === FUNÇÕES PARA UFs ===

// Carregar UFs na tabela
function loadUfs() {
    const ufs = JSON.parse(localStorage.getItem('ufs'));
    const tbody = document.querySelector('.data-grid tbody');
    
    if (tbody) {
        tbody.innerHTML = '';
        
        ufs.forEach(uf => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${uf.id}</td>
                <td>${uf.sigla}</td>
                <td>${uf.descricao}</td>
            `;
            
            tr.addEventListener('click', function() {
                document.getElementById('uf-id').value = uf.id;
                document.getElementById('uf-sigla').value = uf.sigla;
                document.getElementById('uf-descricao').value = uf.descricao;
            });
            
            tbody.appendChild(tr);
        });
    }
}

// Configurar eventos para a página de UFs
function setupUfsEvents() {
    const btnNovo = document.querySelector('.btn-primary');
    const btnEditar = document.querySelector('.btn-warning');
    const btnGravar = document.querySelector('.btn-success');
    const btnExcluir = document.querySelector('.btn-danger');
    const btnSair = document.querySelector('.btn-secondary');
    
    let isEditing = false;
    
    // Botão Novo
    btnNovo.addEventListener('click', function() {
        document.getElementById('uf-id').value = '';
        document.getElementById('uf-sigla').value = '';
        document.getElementById('uf-descricao').value = '';
        isEditing = false;
    });
    
    // Botão Editar
    btnEditar.addEventListener('click', function() {
        const id = document.getElementById('uf-id').value;
        if (!id) {
            alert('Selecione uma UF para editar!');
            return;
        }
        isEditing = true;
        document.getElementById('uf-sigla').focus();
    });
    
    // Botão Gravar
    btnGravar.addEventListener('click', function() {
        const id = document.getElementById('uf-id').value;
        const sigla = document.getElementById('uf-sigla').value.toUpperCase();
        const descricao = document.getElementById('uf-descricao').value;
        
        if (!sigla || !descricao) {
            alert('Preencha todos os campos!');
            return;
        }
        
        if (sigla.length !== 2) {
            alert('A sigla deve ter exatamente 2 caracteres!');
            return;
        }
        
        const ufs = JSON.parse(localStorage.getItem('ufs'));
        
        if (isEditing) {
            // Editar UF existente
            const index = ufs.findIndex(u => u.id == id);
            if (index !== -1) {
                ufs[index].sigla = sigla;
                ufs[index].descricao = descricao;
                localStorage.setItem('ufs', JSON.stringify(ufs));
                alert('UF atualizada com sucesso!');
            }
        } else {
            // Nova UF
            const novaUf = {
                id: getNextId('ufs'),
                sigla: sigla,
                descricao: descricao
            };
            
            ufs.push(novaUf);
            localStorage.setItem('ufs', JSON.stringify(ufs));
            alert('UF cadastrada com sucesso!');
        }
        
        loadUfs();
        document.getElementById('uf-id').value = '';
        document.getElementById('uf-sigla').value = '';
        document.getElementById('uf-descricao').value = '';
        isEditing = false;
    });
    
    // Botão Excluir
    btnExcluir.addEventListener('click', function() {
        const id = document.getElementById('uf-id').value;
        
        if (!id) {
            alert('Selecione uma UF para excluir!');
            return;
        }
        
        if (confirm('Deseja realmente excluir esta UF?')) {
            const ufs = JSON.parse(localStorage.getItem('ufs'));
            const filteredUfs = ufs.filter(u => u.id != id);
            
            localStorage.setItem('ufs', JSON.stringify(filteredUfs));
            alert('UF excluída com sucesso!');
            
            loadUfs();
            document.getElementById('uf-id').value = '';
            document.getElementById('uf-sigla').value = '';
            document.getElementById('uf-descricao').value = '';
        }
    });
    
    // Botão Sair
    btnSair.addEventListener('click', function() {
        window.location.href = 'menu-principal.html';
    });
}

// === FUNÇÕES PARA CIDADES ===

// Carregar Cidades na tabela
function loadCidades() {
    const cidades = JSON.parse(localStorage.getItem('cidades'));
    const ufs = JSON.parse(localStorage.getItem('ufs'));
    const tbody = document.querySelector('.data-grid tbody');
    
    if (tbody) {
        tbody.innerHTML = '';
        
        cidades.forEach(cidade => {
            const uf = ufs.find(u => u.id == cidade.uf_id);
            const ufSigla = uf ? uf.sigla : '';
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${cidade.id}</td>
                <td>${ufSigla}</td>
                <td>${cidade.descricao}</td>
            `;
            
            tr.addEventListener('click', function() {
                document.getElementById('cidade-id').value = cidade.id;
                document.getElementById('cidade-uf').value = cidade.uf_id;
                document.getElementById('cidade-descricao').value = cidade.descricao;
            });
            
            tbody.appendChild(tr);
        });
    }
}

// Preencher select de UFs
function populateUfSelect() {
    const ufSelect = document.getElementById('cidade-uf');
    if (ufSelect) {
        const ufs = JSON.parse(localStorage.getItem('ufs'));
        
        // Limpar opções existentes mantendo apenas a primeira
        while (ufSelect.options.length > 1) {
            ufSelect.remove(1);
        }
        
        // Adicionar UFs
        ufs.forEach(uf => {
            const option = document.createElement('option');
            option.value = uf.id;
            option.textContent = uf.sigla;
            ufSelect.appendChild(option);
        });
    }
}

// Configurar eventos para a página de Cidades
function setupCidadesEvents() {
    const btnNovo = document.querySelector('.btn-primary');
    const btnEditar = document.querySelector('.btn-warning');
    const btnGravar = document.querySelector('.btn-success');
    const btnExcluir = document.querySelector('.btn-danger');
    const btnSair = document.querySelector('.btn-secondary');
    
    let isEditing = false;
    
    // Botão Novo
    btnNovo.addEventListener('click', function() {
        document.getElementById('cidade-id').value = '';
        document.getElementById('cidade-uf').selectedIndex = 0;
        document.getElementById('cidade-descricao').value = '';
        isEditing = false;
    });
    
    // Botão Editar
    btnEditar.addEventListener('click', function() {
        const id = document.getElementById('cidade-id').value;
        if (!id) {
            alert('Selecione uma cidade para editar!');
            return;
        }
        isEditing = true;
        document.getElementById('cidade-descricao').focus();
    });
    
    // Botão Gravar
    btnGravar.addEventListener('click', function() {
        const id = document.getElementById('cidade-id').value;
        const ufId = document.getElementById('cidade-uf').value;
        const descricao = document.getElementById('cidade-descricao').value;
        
        if (!ufId || !descricao) {
            alert('Preencha todos os campos!');
            return;
        }
        
        const cidades = JSON.parse(localStorage.getItem('cidades'));
        
        if (isEditing) {
            // Editar cidade existente
            const index = cidades.findIndex(c => c.id == id);
            if (index !== -1) {
                cidades[index].uf_id = ufId;
                cidades[index].descricao = descricao;
                localStorage.setItem('cidades', JSON.stringify(cidades));
                alert('Cidade atualizada com sucesso!');
            }
        } else {
            // Nova cidade
            const novaCidade = {
                id: getNextId('cidades'),
                uf_id: ufId,
                descricao: descricao
            };
            
            cidades.push(novaCidade);
            localStorage.setItem('cidades', JSON.stringify(cidades));
            alert('Cidade cadastrada com sucesso!');
        }
        
        loadCidades();
        document.getElementById('cidade-id').value = '';
        document.getElementById('cidade-uf').selectedIndex = 0;
        document.getElementById('cidade-descricao').value = '';
        isEditing = false;
    });
    
    // Botão Excluir
    btnExcluir.addEventListener('click', function() {
        const id = document.getElementById('cidade-id').value;
        
        if (!id) {
            alert('Selecione uma cidade para excluir!');
            return;
        }
        
        if (confirm('Deseja realmente excluir esta cidade?')) {
            const cidades = JSON.parse(localStorage.getItem('cidades'));
            const filteredCidades = cidades.filter(c => c.id != id);
            
            localStorage.setItem('cidades', JSON.stringify(filteredCidades));
            alert('Cidade excluída com sucesso!');
            
            loadCidades();
            document.getElementById('cidade-id').value = '';
            document.getElementById('cidade-uf').selectedIndex = 0;
            document.getElementById('cidade-descricao').value = '';
        }
    });
    
    // Botão Sair
    btnSair.addEventListener('click', function() {
        window.location.href = 'menu-principal.html';
    });
}

// === FUNÇÕES PARA CLIENTES ===

// Carregar Clientes na tabela
function loadClientes() {
    const clientes = JSON.parse(localStorage.getItem('clientes'));
    const ufs = JSON.parse(localStorage.getItem('ufs'));
    const cidades = JSON.parse(localStorage.getItem('cidades'));
    const tbody = document.querySelector('.data-grid tbody');
    
    if (tbody) {
        tbody.innerHTML = '';
        
        clientes.forEach(cliente => {
            const uf = ufs.find(u => u.id == cliente.uf_id);
            const cidade = cidades.find(c => c.id == cliente.cidade_id);
            
            const ufSigla = uf ? uf.sigla : '';
            const cidadeNome = cidade ? cidade.descricao : '';
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${cliente.id}</td>
                <td>${cliente.nome}</td>
                <td>${cliente.cpf}</td>
                <td>${cliente.telefone}</td>
                <td>${cliente.email}</td>
                <td>${cidadeNome}/${ufSigla}</td>
            `;
            
            tr.addEventListener('click', function() {
                document.getElementById('cliente-id').value = cliente.id;
                document.getElementById('cliente-nome').value = cliente.nome;
                document.getElementById('cliente-cpf').value = cliente.cpf;
                document.getElementById('cliente-telefone').value = cliente.telefone;
                document.getElementById('cliente-email').value = cliente.email;
                document.getElementById('cliente-endereco').value = cliente.endereco;
                document.getElementById('cliente-uf').value = cliente.uf_id;
                populateCidadeSelect(cliente.uf_id);
                document.getElementById('cliente-cidade').value = cliente.cidade_id;
                document.getElementById('cliente-cep').value = cliente.cep;
            });
            
            tbody.appendChild(tr);
        });
    }
}

// Preencher select de UFs para clientes
function populateUfSelectForClientes() {
    const ufSelect = document.getElementById('cliente-uf');
    if (ufSelect) {
        const ufs = JSON.parse(localStorage.getItem('ufs'));
        
        // Limpar opções existentes mantendo apenas a primeira
        while (ufSelect.options.length > 1) {
            ufSelect.remove(1);
        }
        
        // Adicionar UFs
        ufs.forEach(uf => {
            const option = document.createElement('option');
            option.value = uf.id;
            option.textContent = uf.sigla;
            ufSelect.appendChild(option);
        });
        
        // Adicionar evento de mudança para atualizar o select de cidades
        ufSelect.addEventListener('change', function() {
            const ufId = this.value;
            if (ufId) {
                populateCidadeSelect(ufId);
            } else {
                const cidadeSelect = document.getElementById('cliente-cidade');
                cidadeSelect.innerHTML = '<option value="">Selecione a UF primeiro</option>';
            }
        });
    }
}

// Preencher select de Cidades com base na UF selecionada
function populateCidadeSelect(ufId) {
    const cidadeSelect = document.getElementById('cliente-cidade');
    if (cidadeSelect) {
        const cidades = JSON.parse(localStorage.getItem('cidades'));
        
        // Limpar todas as opções
        cidadeSelect.innerHTML = '';
        
        // Adicionar opção padrão
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Selecione a Cidade';
        cidadeSelect.appendChild(defaultOption);
        
        // Filtrar cidades pela UF selecionada
        const cidadesFiltradas = cidades.filter(c => c.uf_id == ufId);
        
        // Adicionar cidades filtradas
        cidadesFiltradas.forEach(cidade => {
            const option = document.createElement('option');
            option.value = cidade.id;
            option.textContent = cidade.descricao;
            cidadeSelect.appendChild(option);
        });
    }
}

// Configurar eventos para a página de Clientes
function setupClientesEvents() {
    const btnNovo = document.querySelector('.btn-primary');
    const btnEditar = document.querySelector('.btn-warning');
    const btnGravar = document.querySelector('.btn-success');
    const btnExcluir = document.querySelector('.btn-danger');
    const btnSair = document.querySelector('.btn-secondary');
    
    let isEditing = false;
    
      // Botão Novo
    btnNovo.addEventListener('click', function() {
      document.getElementById('cliente-id').value = '';
      document.getElementById('cliente-nome').value = '';
      document.getElementById('cliente-cpf').value = '';
      document.getElementById('cliente-telefone').value = '';
      document.getElementById('cliente-email').value = '';
      document.getElementById('cliente-endereco').value = '';
      document.getElementById('cliente-uf').selectedIndex = 0;
      const cidadeSelect = document.getElementById('cliente-cidade');
      cidadeSelect.innerHTML = '<option value="">Selecione a UF primeiro</option>';
      document.getElementById('cliente-cep').value = '';
      isEditing = false;
    });