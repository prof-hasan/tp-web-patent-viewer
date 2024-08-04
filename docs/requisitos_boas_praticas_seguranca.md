# Requisitos de Segurança

- Certificado SSL no servidor de produção

	- Utilização do protocolo HTTPS e certificado do [Let’s Encrypt](https://letsencrypt.org/)
	- Redirecionamento automático de requisições HTTP para o HTTPS

- Bloqueio de todas as portas do servidor de produção, exceto SSH (**22**), HTTP (**80**) e HTTPS (**443**)

	- Utilização de dois firewalls: **Uncomplicated Firewall (UFW)** e **Grupo de Segurança da AWS**
