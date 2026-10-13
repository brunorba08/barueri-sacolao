# Baruerisacolao — projeto de site

Site estático, responsivo, sem backend e sem dependências de build. Abra index.html diretamente no navegador. Para prévia por HTTP, execute `node preview.cjs` nesta pasta e acesse http://127.0.0.1:4175.

## O que está pronto
- Vitrine com filtros de frutas, legumes e verduras.
- Seções de apresentação, novidades, visita e contato.
- Menu mobile, foco de teclado e suporte a movimento reduzido.
- Instagram configurável, WhatsApp e Google Maps ativados quando os dados são preenchidos.

## Antes de publicar
1. Confirme o nome comercial e o perfil do Instagram. O perfil @baruerisacolao foi confirmado pelo link enviado pelo usuário.
2. WhatsApp (11) 95486-1321 confirmado pelo usuário; endereço Rua Olga, 290 obtido do perfil Google enviado. Falta confirmar horários em config.js.
3. Revise os produtos demonstrativos. Não há preços, ofertas reais ou entrega prometida.
4. Substitua as fotos ilustrativas por imagens próprias do comércio. A prévia usa fotos externas de images.unsplash.com e precisa de internet para carregá-las. Para produção, baixe imagens autorizadas para uma pasta assets e atualize o HTML; registre autor/origem/licença. Fotos achadas no Google não são automaticamente livres.
5. Troque o texto de apresentação pela história confirmada da loja e revise as informações pendentes.
6. Defina demo: false somente após concluir a revisão.

## Domínio e hospedagem
Sugestões a pesquisar: baruerisacolao.com.br e sacolaobarueri.com.br. Disponibilidade não foi consultada nem reservada.

Caminho tradicional: registre o domínio em https://registro.br/ no CPF/CNPJ do proprietário; contrate hospedagem compartilhada com SSL e suporte; envie index.html, style.css, config.js, app.js e assets para public_html (ou a pasta informada pelo provedor). Não precisa contratar VPS, banco de dados ou hospedagem Node.js. O servidor Node de prévia não deve ser enviado à produção.

Caminho econômico: domínio no Registro.br e Cloudflare Pages no plano Free. Suba uma pasta de publicação com os arquivos do site via Direct Upload, depois configure Custom domains. Para o domínio raiz, a documentação pede os nameservers da Cloudflare no registrador. HTTPS deve estar funcionando antes do lançamento.

Referências consultadas em 13/10/2026:
- https://registro.br/dominio/processo-de-liberacao/resultado/ — referência de manutenção normal: R$ 40/ano; confirme o valor no registro.
- https://www.hostinger.com/br/hospedagem-de-sites — Single anunciado a R$ 5,99/mês em contratação de 48 meses, total R$ 287,52; renovação anunciada R$ 23,99/mês. Promoções podem mudar; confira o total e a renovação no checkout. Compare também períodos menores.
- https://developers.cloudflare.com/pages/platform/limits/ — plano Free e limites.
- https://developers.cloudflare.com/pages/get-started/direct-upload/ — envio de arquivos.
- https://developers.cloudflare.com/pages/configuration/custom-domains/ — domínio próprio.

Mantenha domínio e hospedagem em contas do proprietário do comércio, com acesso de recuperação sob seu controle. Não houve compra, publicação ou registro de domínio neste projeto.


## Versão interativa
- Três destaques na abertura; carrosséis de produtos, receitas e inspirações.
- Busca combinada com filtros de categoria.
- Quatro fichas nutricionais com porções entre 50 e 300 g.
- Referência TACO, NEPA/Unicamp, 4ª edição (2011); valores por 100 g de parte comestível. Variedades especificadas nas fichas. São médias de referência, não análises dos produtos da loja.
- Receitas com ingredientes, preparo e inclusão dos itens do hortifruti na lista.
- Lista local com marcar, remover, limpar, copiar e preparar mensagem de consulta no WhatsApp. O usuário faz o envio; não confirma pedido.
- Dados locais protegidos contra armazenamento indisponível. Nenhum backend.
- Verificados no navegador: cálculo de porções, filtros/busca, receita, persistência após recarga, menu e carrossel em 390 px. Sem erros de console nos fluxos observados.
- Fotos ainda ilustrativas. Confirmar horários e revisar catálogo antes de publicar.
