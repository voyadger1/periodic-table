import { Input } from '@/shared/ui/input.tsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MolViewer, type MolViewerHandle } from '@molviewer/core';
import { SmilesSvgRenderer } from 'react-ocl';
import Papa from 'papaparse';
import { Button } from '@/shared/ui/button.tsx';
import { ArrowUpRightIcon, XIcon } from 'lucide-react';
import { sortChemicalFormula } from '@/widgets/calculator/util/formula-parse.ts';
import { Drawer, DrawerContent } from '@/shared/ui/drawer.tsx';
import { cn } from '@/shared/lib/utils.ts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs.tsx';

export const NUMBERS_DOWN: Record<number, string> = {
  0: '₀',
  1: '₁',
  2: '₂',
  3: '₃',
  4: '₄',
  5: '₅',
  6: '₆',
  7: '₇',
  8: '₈',
  9: '₉',
};

interface CompoundData {
  COMPOUND_CID: string;
  IUPAC_NAME: string;
  MOLECULAR_FORMULA: string;
  SMILES: string;
  IUPAC_INCHI: string;
  IUPAC_INCHIKEY: string;
  MOLECULAR_WEIGHT: string;
  EXACT_MASS: string;
  MONOISOTOPIC_WEIGHT: string;
  TOTAL_CHARGE: string;
  XLOGP3_AA: string;
  CACTVS_TPSA: string;
  CACTVS_HBOND_ACCEPTOR: string;
  CACTVS_HBOND_DONOR: string;
  CACTVS_ROTATABLE_BOND: string;
  CACTVS_COMPLEXITY: string;
  MOLECULAR_FORMULA_KEY: string;
}

const parserCompoundsCSV = async (): Promise<CompoundData[]> => {
  const csvFilePath = '/data/compounds.csv';
  const csvFile = await (await fetch(csvFilePath)).text();
  let compounds: CompoundData[] = [];

  Papa.parse<CompoundData>(csvFile, {
    header: true, // Первая строка — заголовки
    skipEmptyLines: true,
    dynamicTyping: false, // Оставляем все как строки (можно настроить)
    complete: (result) => {
      compounds = result.data;
      console.log('Загружено записей:', result.data.length);
    },
    error: (error) => {
      console.error('Ошибка парсинга CSV:', error);
    },
  });

  return compounds;
};

export const Calculator = () => {
  const viewerRef = useRef<MolViewerHandle>(null);
  const [compounds, setCompounds] = useState<CompoundData[]>([]);
  const [compoundsMap, setCompoundsMap] = useState<Map<string, CompoundData>>(new Map());
  const [compoundViewIndex, setCompoundViewIndex] = useState('');
  const [openHelper, setOpenHelper] = useState(false);
  const [openCompoundView, setOpenCompoundView] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      const compounds = await parserCompoundsCSV();
      setCompounds(compounds);
      const compoundsMap: Map<string, CompoundData> = new Map();
      compounds.map((compound) => compoundsMap.set(compound.COMPOUND_CID, compound));
      setCompoundsMap(compoundsMap);
    })();
  }, []);

  const searchCompounds = useMemo(() => {
    try {
      const formulaKey = sortChemicalFormula(search);
      return compounds.filter((compound) => compound.MOLECULAR_FORMULA_KEY === formulaKey);
    } catch (err) {
      console.log(err);
      return [];
    }
  }, [search]);

  const compundView = useMemo(() => {
    return compoundsMap.get(compoundViewIndex);
  }, [compoundViewIndex, compoundsMap]);

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        setOpenHelper(false);
      }
    };

    window.addEventListener('keydown', handleKeyboard);

    () => {
      window.removeEventListener('keydown', handleKeyboard);
    };
  }, []);

  return (
    <>
      <div
        className={cn(
          'w-full h-[100vh] fixed top-0 left-0 z-1 bg-black/50 backdrop-blur-xl',
          'opacity-0 pointer-events-none',
          'transition-all duration-300',
          openHelper && 'opacity-100 pointer-events-auto'
        )}
      />

      <div
        className={
          'fixed top-10 left-1/2 -translate-x-1/2 z-[2] w-full flex flex-col gap-4 items-center'
        }
      >
        <div
          className={cn(
            'flex flex-col gap-2 w-full max-w-[600px] z-10',
            'transition-all duration-300',
            openHelper && 'max-w-[800px]'
          )}
        >
          <div className={'flex flex-row gap-4 items-center justify-center'}>
            <Input
              className={'w-full bg-[#151515] shadow-white/50 shadow-2xl border-[#333]'}
              placeholder={'H₂O + SO₃ → H₂SO₄'}
              value={search}
              onInput={(e) => setSearch(e.currentTarget.value)}
              onClick={() => setOpenHelper(true)}
            />

            <Button
              className={cn(
                'aspect-square text-white',
                'border-[#333] bg-[#151515] hover:bg-[#252525]',
                'w-0 h-0 opacity-0 pointer-events-none',
                openHelper && 'h-9 w-9 opacity-100 pointer-events-auto'
              )}
              onClick={() => setOpenHelper(false)}
            >
              <XIcon />
            </Button>
          </div>

          <div
            className={cn(
              'bg-[#151515] w-full h-[200px] rounded-lg p-4 overflow-y-auto flex flex-col gap-2',
              'opacity-0 pointer-events-none h-[0px]',
              'transition-all duration-200',
              openHelper &&
                searchCompounds.length > 0 &&
                'pointer-events-auto opacity-100 h-[200px]'
            )}
          >
            {searchCompounds.map((compound) => (
              <div
                key={compound.COMPOUND_CID}
                className={'cursor-pointer bg-white/1 border rounded-lg p-2 flex flex-col gap-1'}
                onClick={() => {
                  setCompoundViewIndex(compound.COMPOUND_CID);
                  setOpenCompoundView(true);
                }}
              >
                <span className={'font-bold'}>{compound.MOLECULAR_FORMULA}</span>
                <span className={'text-white/50 text-[8pt]'}>{compound.SMILES}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Drawer open={openCompoundView} onOpenChange={setOpenCompoundView}>
        <DrawerContent className={'w-full'}>
          <Tabs defaultValue="data">
            <TabsList>
              <TabsTrigger value="data">Data</TabsTrigger>
              <TabsTrigger value="3d-model">3D Model</TabsTrigger>
            </TabsList>
            <TabsContent value="data">
              {compundView && (
                <div className="w-full overflow-y-auto flex flex-col gap-4">
                  <div className={'flex flex-row gap-4'}>
                    <div className={'bg-white rounded-md flex items-center justify-center'}>
                      <SmilesSvgRenderer
                        smiles={compundView.SMILES}
                        // label={compundView.MOLECULAR_FORMULA}
                        height={200}
                        width={200}
                        bondHighlightColor={'#f00'}
                        // labelColor={'#fff'}
                        atomHighlightColor={'#fff'}
                      />
                    </div>

                    <div className={'flex flex-col gap-1 text-[18px]'}>
                      <a
                        className={cn(
                          'text-[40pt] font-bold flex flex-row gap-1 underline',
                          'transition-all duration-300',
                          'hover:gap-2'
                        )}
                        href={`https://pubchem.ncbi.nlm.nih.gov/compound/${compundView.COMPOUND_CID}`}
                        target={'_blank'}
                      >
                        {compundView.IUPAC_NAME
                          ? compundView.IUPAC_NAME
                          : `CID ${compundView.COMPOUND_CID}`}
                        <ArrowUpRightIcon size={40} />
                      </a>

                      <hr />

                      <div className={'flex flex-row gap-12'}>
                        <div className={'flex-1 flex flex-col gap-1'}>
                          <div className={'flex flex-row items-center gap-2'}>
                            <span className={'text-white/60 text-[16px] font-extralight text-end'}>
                              Molecular formula
                            </span>
                            <span>{compundView.MOLECULAR_FORMULA}</span>
                          </div>

                          <div className={'flex flex-row items-center gap-2'}>
                            <span className={'text-white/60 text-[16px] font-extralight text-end'}>
                              SMILES
                            </span>
                            <span>{compundView.SMILES}</span>
                          </div>

                          <div className={'flex flex-row items-center gap-2'}>
                            <span className={'text-white/60 text-[16px] font-extralight text-end'}>
                              IUPAC name
                            </span>
                            <span>{compundView.IUPAC_NAME}</span>
                          </div>

                          <div className={'flex flex-row items-center gap-2'}>
                            <span className={'text-white/60 text-[16px] font-extralight text-end'}>
                              InChI
                            </span>
                            <span>{compundView.IUPAC_INCHI}</span>
                          </div>

                          <div className={'flex flex-row items-center gap-2'}>
                            <span className={'text-white/60 text-[16px] font-extralight text-end'}>
                              InChI key
                            </span>
                            <span>{compundView.IUPAC_INCHIKEY}</span>
                          </div>
                        </div>

                        <div className={'flex-1 flex flex-col gap-1'}>
                          <div className={'flex flex-row items-center gap-2'}>
                            <span className={'text-white/60 text-[16px] font-extralight text-end'}>
                              Complexity
                            </span>
                            <span>{compundView.CACTVS_COMPLEXITY}</span>
                          </div>

                          <div className={'flex flex-row items-center gap-2'}>
                            <span className={'text-white/60 text-[16px] font-extralight text-end'}>
                              H Bond Acceptor
                            </span>
                            <span>{compundView.CACTVS_HBOND_ACCEPTOR}</span>
                          </div>

                          <div className={'flex flex-row items-center gap-2'}>
                            <span className={'text-white/60 text-[16px] font-extralight text-end'}>
                              H Bond donor
                            </span>
                            <span>{compundView.CACTVS_HBOND_DONOR}</span>
                          </div>

                          <div className={'flex flex-row items-center gap-2'}>
                            <span className={'text-white/60 text-[16px] font-extralight text-end'}>
                              TPSA
                            </span>
                            <span>{compundView.CACTVS_TPSA}</span>
                          </div>

                          <div className={'flex flex-row items-center gap-2'}>
                            <span className={'text-white/60 text-[16px] font-extralight text-end'}>
                              Rotatable Bond
                            </span>
                            <span>{compundView.CACTVS_ROTATABLE_BOND}</span>
                          </div>
                        </div>

                        <div className={'flex-1 flex flex-col gap-1'}>
                          <div className={'flex flex-row items-center gap-2'}>
                            <span className={'text-white/60 text-[16px] font-extralight text-end'}>
                              Molecular weight
                            </span>
                            <span>{compundView.MOLECULAR_WEIGHT}</span>
                          </div>

                          <div className={'flex flex-row items-center gap-2'}>
                            <span className={'text-white/60 text-[16px] font-extralight text-end'}>
                              Monoisotopic mass
                            </span>
                            <span>{compundView.MONOISOTOPIC_WEIGHT}</span>
                          </div>

                          <div className={'flex flex-row items-center gap-2'}>
                            <span className={'text-white/60 text-[16px] font-extralight text-end'}>
                              Exact mass
                            </span>
                            <span>{compundView.EXACT_MASS}</span>
                          </div>

                          <div className={'flex flex-row items-center gap-2'}>
                            <span className={'text-white/60 text-[16px] font-extralight text-end'}>
                              Charge
                            </span>
                            <span>{compundView.TOTAL_CHARGE}</span>
                          </div>

                          <div className={'flex flex-row items-center gap-2'}>
                            <span className={'text-white/60 text-[16px] font-extralight text-end'}>
                              LogP
                            </span>
                            <span>{compundView.XLOGP3_AA}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="3d-model">
              {compundView && compundView.SMILES && (
                <div className={'rounded-3xl overflow-hidden'}>
                  <MolViewer
                    ref={viewerRef}
                    source={{
                      url: `https://cactus.nci.nih.gov/chemical/structure/${compundView.SMILES}/file?format=pdb`,
                    }}
                    onLoad={(data) => console.log('Загружено атомов:', data.atomCount)}
                    className={'bg-red-600 w-full'}
                    style={{ background: '#000' }}
                    theme={{ '--viewport-background': '#000' }}
                    ui={{
                      sidebar: false, // Скрыть всю боковую панель
                      panels: {
                        trajectory: true, // Скрыть панель управления анимацией
                        polymer: false, // Скрыть конструктор полимеров
                      },
                    }}
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </DrawerContent>
      </Drawer>
    </>
  );
};
