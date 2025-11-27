import React from 'react'
import Typography from '@mui/material/Typography'

export default function Homepage() {
  const [ls, setLs] = React.useState([])
  const [cookies, setCookies] = React.useState('')

  React.useEffect(() => {
    // Coleta dados do localStorage OCULTANDO TODOS OS VALORES SENSÍVEIS
    const _ls = []
    const sensitiveKeys = [
      'loginData', 'userData', 'recentLogin', 'agrotech_token', 'agrotech_user',
      'token', 'auth', 'password', 'email', 'user', 'session'
    ]
    
    for(let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i)
      let value = window.localStorage.getItem(key)
      
      // Verifica se a chave é sensível (case insensitive)
      const isSensitive = sensitiveKeys.some(sensitiveKey => 
        key.toLowerCase().includes(sensitiveKey.toLowerCase())
      )
      
      // Se for sensível, oculta o valor COMPLETAMENTE
      if(isSensitive) {
        value = '*** DADO SENSÍVEL OCULTADO ***'
      }
      
      _ls.push({ [key]: value })
    }
    console.log(_ls)
    setLs(_ls)

    // Oculta TODOS os cookies para não expor nenhum valor
    const hasCookies = document.cookie.length > 0
    setCookies(hasCookies ? '*** COOKIES OCULTADOS POR SEGURANÇA ***' : 'Nenhum cookie encontrado')
  }, [])

  return(
    <>
      <Typography variant="h1" gutterBottom>
        Projeto VULCOM
      </Typography>
      
      <Typography>
        Sistema para análise e estudo de vulnerabilidades comuns  
      </Typography>

      <Typography variant="h6">
        Exposição de valores do <em>local storage</em>
        <Typography variant="caption" style={{ fontFamily: 'monospace', display: 'block' }}>
          {
            ls.map((kv, index) => (
              <p key={index}>{Object.keys(kv)[0]} =&gt; {kv[Object.keys(kv)[0]]}</p>
            ))
          }
        </Typography>
      </Typography>

      <Typography variant="h6">
        Exposição de <em>cookies</em>
        <Typography variant="caption" style={{ fontFamily: 'monospace', display: 'block' }}>
          <p>{cookies}</p>  
        </Typography>
      </Typography>
    </>
  )
}