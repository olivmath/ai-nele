import { useEffect, useMemo, useState } from 'react'
import { DiffView, DiffModeEnum } from '@git-diff-view/react'
import { generateDiffFile } from '@git-diff-view/file'
import { getDiffViewHighlighter } from '@git-diff-view/shiki'
import '@git-diff-view/react/styles/diff-view.css'
import { Card } from './dao-adapters'

const vulnerableContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TheDao {
    mapping(address => uint256) public balances;

    function withdraw(uint256 amount) external {
        if(balances[msg.sender] < amount) {
          revert("Insufficient balance");
        }

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");

        balances[msg.sender] -= amount;
    }
}`

const correctedContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TheDao {
    mapping(address => uint256) public balances;

    function withdraw(uint256 amount) external {
        if(balances[msg.sender] < amount) {
          revert("Insufficient balance");
        }

        balances[msg.sender] -= amount;

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
    }
}`

export function SecurityDiff({
  filename = 'contracts/TheDao.sol',
  label = 'Security fix · Checks–Effects–Interactions',
  vulnerable = vulnerableContract,
  corrected = correctedContract,
  language = 'solidity',
}) {
  const [shikiHighlighter, setShikiHighlighter] = useState(null)

  useEffect(() => {
    let mounted = true
    getDiffViewHighlighter(['solidity']).then((highlighter) => {
      if (mounted) setShikiHighlighter(highlighter)
    })
    return () => { mounted = false }
  }, [])

  const diffFile = useMemo(() => {
    const file = generateDiffFile(
      filename, vulnerable,
      filename, corrected,
      language, language,
    )
    file.initTheme('dark')
    file.init()
    file.buildSplitDiffLines()
    return file
  }, [corrected, filename, language, vulnerable])

  return (
    <Card className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-[0_18px_48px_rgba(0,0,0,.45)]">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#161b22] px-5 py-3">
        <div>
          <p className="font-mono text-xs text-white/80">{filename}</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/35">{label}</p>
        </div>
        <div className="flex gap-3 font-mono text-xs"><span className="text-red-400">−2</span><span className="text-emerald-400">+2</span></div>
      </div>
      <div className="solidity-diff-wrapper max-h-[485px] overflow-auto">
        <DiffView
          diffFile={diffFile}
          diffViewMode={DiffModeEnum.Split}
          diffViewTheme="dark"
          diffViewHighlight
          diffViewWrap
          diffViewFontSize={12}
          registerHighlighter={shikiHighlighter || undefined}
        />
      </div>
    </Card>
  )
}

export function SolidityCodeBlock() {
  return <SecurityDiff />
}
