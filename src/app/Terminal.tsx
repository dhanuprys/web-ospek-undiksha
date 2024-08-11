'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

const commands = [
    {
        name: 'help',
        description: 'Menampilkan bantuan',
        component: CommandHelpTable,
        delay: null
    },
    {
        name: 'clear',
        description: 'Menghapus histori',
        component: null,
        delay: null
    },
    {
        name: 'mulai',
        description: 'Menampilkan header pada awal aplikasi',
        component: WelcomeMessage,
        delay: null
    },
    {
        name: 'saya',
        description: 'Menampilkan informasi dasar tentang diri saya',
        component: StudentTentangSaya,
        delay: null
    },
    {
        name: 'sosial',
        description: 'Menampilkan sosial media',
        component: SocialMediaInformationTable,
        delay: null
    },
    {
        name: 'harapan',
        description: 'Menampilkan harapan saya',
        component: StudentHarapan,
        delay: null
    },
    {
        name: 'prestasi',
        description: 'Menampilkan prestasi saya',
        component: StudentPrestasi,
        delay: null
    }
];

function Terminal() {
    const [isCommandLoading, setCommandLoading] = useState(false);
    const [histories, setHistories] = useState<ReactNode[]>([
        <WelcomeMessage key="welcome" />
    ]);

    const resolveCommand = useCallback((commandInput: string) => {
        return commands.find(c => c.name === commandInput);
    }, []);

    const enterCommand = useCallback((command: string) => {
        setCommandLoading(true);

        const commandProperty = resolveCommand(command);

            if (!commandProperty) {
                setHistories([
                    ...histories,
                    <CommandHistory key="history" command={command} />,
                    <CommandNotFound key="notfound" />
                ]);
                setCommandLoading(false);
                return;
            }

        setTimeout(() => {
            commandProperty.component
                ?
                setHistories([
                    ...histories,
                    <CommandHistory key="history" command={command} />,
                    commandProperty.component()
                ])
                : setHistories([]);

            setCommandLoading(false);
        }, commandProperty.delay || 1500);
    }, [histories, resolveCommand]);

    useEffect(() => {
        window.scroll({
            left: 0,
            top: 999999999
        });
    }, [histories]);

    return (
        <label htmlFor="terminalInput">
            <div className="min-h-screen bg-black text-white p-1 md:p-2 text-xs md:text-sm">
                <div className="flex flex-col gap-2">
                    {
                        histories.map((history, i) => {
                            return <React.Fragment key={i}>{history}</React.Fragment>;
                        })
                    }

                    <InputPrompt
                        enabled={!isCommandLoading}
                        onResolve={enterCommand} />
                </div>
            </div>
        </label>
    );
}

function WelcomeMessage() {
    return (
        <div className="flex flex-col gap-2">
            <p>🚀 Welcome to the Dhanu-Undiksha Terminal! Type &apos;help&apos; for a list of commands.</p>

            <StudentInformationTable />
            <SocialMediaInformationTable />
            <CommandHelpTable />
        </div>
    );
}

function CommandHistory({ command }: { command: string }) {
    return (
        <div className="flex items-center gap-x-2">
            <span>
                <span className="text-green-600">dhanu@undiksha</span>:<span className="text-blue-600">~</span>$
            </span>
            <span>{command}</span>
        </div>
    );
}

function CommandNotFound() {
    return (
        <div>
            <span className="font-semibold">Perintah Tidak Ditemukan</span>
            <p>Maaf, perintah yang Anda masukkan tidak ditemukan.</p>
        </div>
    );
}

function CommandHelpTable() {
    return (
        <div className="flex gap-2">
            <div>💁</div>
            <div className="flex-1">
                <span className="font-semibold">Bantuan</span>
                <table className="[&>tbody>tr>td]:pr-1 [&>tbody>tr>td]:align-top ml-2 mt-2">
                    <tbody>
                        {
                            commands.map((command) => {
                                return (
                                    <tr key={command.name}>
                                        <td>{command.name}</td>
                                        <td className="text-slate-400 !text-xs">•</td>
                                        <td className="text-slate-300">{command.description}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function StudentTentangSaya() {
    return (
        <div>
            <p>

            </p>
        </div>
    );
}

function StudentHarapan() {
    return (
        <div>
            <p>
                Sebagai calon mahasiswa yang penuh semangat, saya sangat berharap dapat menjadi bagian
                dari Universitas Pendidikan Ganesha, sebuah institusi yang terkenal dengan dedikasi
                tinggi dalam mencetak generasi unggul. Saya memilih Universitas Pendidikan Ganesha
                karena saya yakin bahwa program studi Sistem Informasi di universitas ini adalah tempat
                yang tepat untuk saya mengembangkan potensi dan minat saya dalam bidang teknologi dan
                informasi. Dengan bimbingan dari para akademisi yang kompeten dan lingkungan
                pembelajaran yang inspiratif, saya yakin Universitas Pendidikan Ganesha akan menjadi
                fondasi yang kuat bagi perjalanan akademis dan karier saya di masa depan.
            </p>
        </div>
    );
}

function StudentPrestasi() {
    return (
        <div>
            <p>
                Sebagai calon mahasiswa yang penuh semangat, saya sangat berharap dapat menjadi bagian
                dari Universitas Pendidikan Ganesha, sebuah institusi yang terkenal dengan dedikasi
                tinggi dalam mencetak generasi unggul. Saya memilih Universitas Pendidikan Ganesha
                karena saya yakin bahwa program studi Sistem Informasi di universitas ini adalah tempat
                yang tepat untuk saya mengembangkan potensi dan minat saya dalam bidang teknologi dan
                informasi. Dengan bimbingan dari para akademisi yang kompeten dan lingkungan
                pembelajaran yang inspiratif, saya yakin Universitas Pendidikan Ganesha akan menjadi
                fondasi yang kuat bagi perjalanan akademis dan karier saya di masa depan.
            </p>
        </div>
    );
}


function StudentInformationTable() {
    return (
        <div>
            <hr className="w-full border border-dashed border-slate-400" />
            <div className="flex gap-4 items-center my-6 px-4">
                <div className="w-[70px] h-[70px]">
                    <Image
                        className="w-full h-full object-cover rounded-full"
                        src="/me.jpg"
                        width={100}
                        height={100}
                        alt="profile" />
                </div>
                <div>
                    <span className="font-semibold">Informasi Mahasiswa</span>
                    <table>
                        <tbody>
                            <tr>
                                <td>Nama</td>
                                <td>: Gede Dhanu Purnayasa</td>
                            </tr>
                            <tr>
                                <td>NIM</td>
                                <td>: 2415091092</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <hr className="w-full border border-dashed border-slate-400" />
        </div>
    );
}

function SocialMediaInformationTable() {
    return (
        <div className="flex gap-2">
            <div>❤️</div>
            <div>
                <span className="font-semibold">Sosial Media</span>
                <table className="ml-2 mt-2">
                    <tbody>
                        <tr>
                            <td>Instagram</td>
                            <td>
                                : <Link href="https://instagram.com/dhanuprys" className="underline">dhanuprys</Link>
                            </td>
                        </tr>
                        <tr>
                            <td>Github</td>
                            <td>
                                : <Link href="https://github.com/dhanuprys" className="underline">dhanuprys</Link>
                            </td>
                        </tr>
                        <tr>
                            <td>LinkedIn</td>
                            <td>: Gede Dhanu Purnayasa</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function InputPrompt({
    enabled,
    onResolve
}: {
    enabled: boolean,
    onResolve: (command: string) => void
}) {
    const [command, setCommand] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const clearInput = useCallback(() => {
        setCommand('');
        return true;
    }, []);

    useEffect(() => {
        if (!inputRef || !inputRef.current) return;

        inputRef.current.focus();

        // const refocusTimer = setInterval(() => inputRef.current?.focus(), 3000);

        // return () => clearInterval(refocusTimer);
    }, [inputRef]);

    return (
        <div className={`flex items-center gap-x-2 ${!enabled ? '[&>*]:!text-slate-900 animate-pulse' : ''}`}>
            <span>
                <span className="text-green-600">dhanu@undiksha</span>:<span className="text-blue-600">~</span>$
            </span>
            <input
                ref={inputRef}
                id="terminalInput"
                value={command}
                type="text"
                className="flex-1 h-8 bg-transparent border-none focus:outline-none focus:bg-zinc-950 disabled:placeholder:text-zinc-800"
                placeholder={enabled ? 'Masukkan perintah disini...' : 'loading...'}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={(e) => e.key.toLowerCase() === 'enter' && clearInput() && onResolve(command)}
                disabled={!enabled}
            />
        </div>
    );
}

export default Terminal;