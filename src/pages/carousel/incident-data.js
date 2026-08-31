import theDao from '../../data/carousel/content/the-dao.json'
import parityWallet from '../../data/carousel/content/parity-wallet.json'
import beautychain from '../../data/carousel/content/beautychain.json'
import bzx from '../../data/carousel/content/bzx.json'
import polyNetwork from '../../data/carousel/content/poly-network.json'
import creamFinance from '../../data/carousel/content/cream-finance.json'
import roninBridge from '../../data/carousel/content/ronin-bridge.json'
import akutarsNft from '../../data/carousel/content/akutars-nft.json'
import nomadBridge from '../../data/carousel/content/nomad-bridge.json'
import eulerFinance from '../../data/carousel/content/euler-finance.json'
import curveFinance from '../../data/carousel/content/curve-finance.json'

function flatten(content) {
  const s1 = content.slide1
  const s2 = content.slide2
  const s3 = content.slide3
  const s4 = content.slide4
  return { ...s1, ...s2, ...s3, diffTitle: s4.diffTitle }
}

const contentMap = {
  'the-dao': theDao,
  'parity-wallet': parityWallet,
  beautychain,
  bzx,
  'poly-network': polyNetwork,
  'cream-finance': creamFinance,
  'ronin-bridge': roninBridge,
  'akutars-nft': akutarsNft,
  'nomad-bridge': nomadBridge,
  'euler-finance': eulerFinance,
  'curve-finance': curveFinance,
}

export const caseOverrides = Object.fromEntries(
  Object.entries(contentMap).map(([slug, content]) => [slug, flatten(content)])
)

export const protections = Object.fromEntries(
  Object.entries(contentMap).map(([slug, content]) => [slug, content.slide5.lessons])
)

export const diffExamples = Object.fromEntries(
  Object.entries(contentMap).map(([slug, content]) => [
    slug,
    [content.slide4.vulnerable, content.slide4.corrected],
  ])
)

export const defaultLessons = [
  'Defina invariantes antes do deploy', 'Todo contrato crítico precisa de propriedades de segurança testáveis.',
  'Reduza privilégios e superfície', 'Menos permissões e menos caminhos administrativos significam menos exploração.',
  'Use limites de dano', 'Pausas, caps e timelocks evitam que uma falha vire um roubo total.',
  'Simule o atacante', 'Teste o caminho adversarial, não apenas a execução que você espera.',
]
