# Security Policy

## 🔒 Vulnerabilidades de Segurança

Se você descobrir uma vulnerabilidade de segurança neste projeto, por favor:

1. **NÃO** abra uma issue pública
2. Envie um email para: contato@desaincorporacoes.com.br
3. Inclua uma descrição detalhada da vulnerabilidade
4. Aguarde nossa resposta antes de divulgar publicamente

## 📊 Status de Segurança

**Última verificação:** Dezembro 2025

- ✅ **0 vulnerabilidades** conhecidas
- ✅ Dependências atualizadas
- ✅ Autenticação JWT implementada
- ✅ Validação de dados com Zod
- ✅ Cookies seguros configurados

## 🔄 Atualizações Implementadas

### Migrações de Segurança
- **nookies** → **js-cookie** (mais seguro)
- **Next.js 13.4.19** → **14.2.35** (correções críticas)
- **Axios 1.5.0** → **1.13.2** (vulnerabilidades SSRF)
- **React 18.2.0** → **18.3.1** (melhorias de segurança)

### Vulnerabilidades Corrigidas
- 🔴 **Críticas**: 2 corrigidas
- 🟠 **Altas**: 4 corrigidas  
- 🟡 **Moderadas**: 7 corrigidas
- 🟢 **Baixas**: 3 corrigidas

## 📋 Verificação de Segurança

Execute regularmente:

```bash
# Verificar vulnerabilidades
npm audit

# Atualizar dependências
npm update

# Verificar configuração
./check-setup.sh
```