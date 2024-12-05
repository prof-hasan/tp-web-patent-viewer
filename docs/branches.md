# Padrão de Nomenclatura para Branches

Para este projeto será utilizado um padrão de branches reduzido do **Git Flow**, mais especificamente teremos as seguintes branches:

- **main:** nessa branch temos a versão principal do sistema pronta para ser publicada e colocada em produção.

- **develop:** nessa branch serão rastreadas as novas funcionalidades implementadas no sistema que irão ser publicadas na próxima versão oficial. Quando uma nova versão for gerada, será feita a fusão dessa branch com a **main** para que o ambiente de produção seja atualizado com base na **main**. A branch **develop** não deverá ser deletada após esse processo.

- **feature/name:** branches com este padrão de nome serão utilizadas para realizar o desenvolvimento de novas funcionalidades especificas do sistema, onde **name** refere-se a um nome descritivo da nova funcionalidade. Após concluído o desenvolvimento, essa branch será fundida à **develop** e então deletada/fechada.

- **hotfix/name:** branches com este padrão de nome serão utilizadas para a realização de correções urgentes do sistema para serem publicadas imediatamente após o término da correção, onde **name** refere-se a um nome descritivo para o que está sendo corrigido. Sendo assim, no final das implementações essa branch será fundida à **main** e à **develop** para então ser deletada/fechada.
