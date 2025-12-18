#!/bin/bash

# Script para verificar se o ambiente está configurado corretamente
# para o projeto de Sá Incorporações

echo "🔍 Verificando configuração do ambiente..."
echo ""

# Verificar se o backend está rodando
echo "1. Verificando backend (porta 3000)..."
if curl -s --connect-timeout 5 http://localhost:3000/api > /dev/null 2>&1; then
    echo "   ✅ Backend está rodando e acessível"
else
    echo "   ❌ Backend não está acessível"
    echo "      Execute: cd /home/odair/dev/desa/db_desa && docker-compose up -d"
fi

echo ""

# Verificar containers Docker
echo "2. Verificando containers Docker..."
if command -v docker &> /dev/null; then
    containers_running=$(docker ps --filter "name=desa_" --format "table {{.Names}}\t{{.Status}}" 2>/dev/null)
    if [[ -n "$containers_running" ]]; then
        echo "   ✅ Containers encontrados:"
        echo "$containers_running" | sed 's/^/      /'
    else
        echo "   ❌ Nenhum container desa_ encontrado"
        echo "      Execute: cd /home/odair/dev/desa/db_desa && docker-compose up -d"
    fi
else
    echo "   ⚠️  Docker não encontrado"
fi

echo ""

# Verificar dependências do frontend
echo "3. Verificando dependências do frontend..."
if [[ -d "node_modules" ]]; then
    echo "   ✅ Dependências instaladas"
    
    # Verificar vulnerabilidades
    vulnerabilities=$(npm audit --json 2>/dev/null | jq -r '.metadata.vulnerabilities.total' 2>/dev/null || echo "unknown")
    if [[ "$vulnerabilities" == "0" ]]; then
        echo "   ✅ Nenhuma vulnerabilidade encontrada"
    elif [[ "$vulnerabilities" == "unknown" ]]; then
        echo "   ⚠️  Não foi possível verificar vulnerabilidades"
    else
        echo "   ⚠️  $vulnerabilities vulnerabilidades encontradas (execute: npm audit)"
    fi
else
    echo "   ❌ Dependências não instaladas"
    echo "      Execute: npm install"
fi

echo ""

# Verificar arquivos de configuração
echo "4. Verificando arquivos de configuração..."
if [[ -f ".env.local" ]]; then
    echo "   ✅ .env.local encontrado"
else
    echo "   ❌ .env.local não encontrado"
fi

if [[ -f "src/services/api.tsx" ]]; then
    echo "   ✅ Configuração da API encontrada"
    
    # Verificar se usa js-cookie em vez de nookies
    if grep -q "js-cookie" package.json 2>/dev/null; then
        echo "   ✅ js-cookie configurado (seguro)"
    else
        echo "   ⚠️  js-cookie não encontrado"
    fi
else
    echo "   ❌ Arquivo de configuração da API não encontrado"
fi

echo ""

# Testar conectividade com a API
echo "5. Testando conectividade com a API..."
if curl -s --connect-timeout 5 http://localhost:3000/properties > /dev/null 2>&1; then
    echo "   ✅ API está respondendo"
else
    echo "   ❌ Não foi possível conectar com a API"
fi

echo ""

# Verificar versões importantes
echo "6. Verificando versões das dependências..."
if [[ -f "package.json" ]]; then
    next_version=$(grep '"next":' package.json | sed 's/.*"next": "\([^"]*\)".*/\1/' | tr -d '^~')
    react_version=$(grep '"react":' package.json | sed 's/.*"react": "\([^"]*\)".*/\1/' | tr -d '^~')
    typescript_version=$(grep '"typescript":' package.json | sed 's/.*"typescript": "\([^"]*\)".*/\1/' | tr -d '^~')
    
    echo "   📦 Next.js: $next_version"
    echo "   ⚛️  React: $react_version"
    echo "   📘 TypeScript: $typescript_version"
fi

echo ""
echo "📋 Resumo:"
echo "   🎨 Frontend: http://localhost:3001"
echo "   🚀 Backend API: http://localhost:3000"
echo "   📚 Swagger: http://localhost:3000/api"
echo ""
echo "🚀 Para iniciar o frontend: npm run dev"
echo "🔧 Para verificar build: npm run build"