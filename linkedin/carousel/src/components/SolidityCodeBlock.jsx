import { useMemo } from 'react'
import { DiffView, DiffModeEnum } from '@git-diff-view/react'
import { generateDiffFile } from '@git-diff-view/file'
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

export function SolidityCodeBlock() {
  const diffFile = useMemo(() => {
    const file = generateDiffFile(
      'contracts/TheDao.sol', vulnerableContract,
      'contracts/SecureVault.sol', correctedContract,
      'typescript', 'typescript',
    )
    file.initTheme('dark')
    file.init()
    file.buildSplitDiffLines()
    return file
  }, [])

  return (
    <Card className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-[0_18px_48px_rgba(0,0,0,.45)]">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#161b22] px-5 py-3">
        <div>
          <p className="font-mono text-xs text-white/80">contracts/Vault.sol</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/35">Security fix · Checks–Effects–Interactions</p>
        </div>
        <div className="flex gap-3 font-mono text-xs"><span className="text-red-400">−2</span><span className="text-emerald-400">+2</span></div>
      </div>
      <div className="solidity-diff-wrapper max-h-[485px] overflow-auto">
        <DiffView
          diffFile={diffFile}
          diffViewMode={DiffModeEnum.Split}
          diffViewTheme="dark"
          diffViewHighlight
          diffViewWrap={false}
          diffViewFontSize={13}
        />
      </div>
    </Card>
  )
}
