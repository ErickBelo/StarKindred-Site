import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getFirestore, doc, getDoc, updateDoc, deleteDoc, 
    collection, getDocs, setDoc, addDoc, query, orderBy, limit 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDqJZgfNSK281-eMJEucA5KOH00rg4HuEU",
    authDomain: "starkindred-51af3.firebaseapp.com",
    projectId: "starkindred-51af3",
    storageBucket: "starkindred-51af3.firebasestorage.app",
    messagingSenderId: "833370470650",
    appId: "1:833370470650:web:162ac3be5b8c24866c7143",
    measurementId: "G-FFE53C599V"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const nomeSalvo = localStorage.getItem("sk_usuario");
let eAdministrador = false;
let todosMembrosCache = [];

document.addEventListener("DOMContentLoaded", async function() {
    if (!nomeSalvo) {
        alert("Identificação não autorizada! Retornando ao login...");
        window.location.href = "login.html";
        return;
    }

    carregarComunicados();
    carregarLogs();

    try {
        const docRef = doc(db, "membros", nomeSalvo);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const dados = docSnap.data();

            document.getElementById("nome-piloto").textContent = dados.nome;
            document.getElementById("display-patente").textContent = dados.patente || "Piloto";
            
            const armaMain = dados["ArmaMain's"] || "Não definido";
            document.getElementById("main-jogador").textContent = `${dados.mainLegend || 'Não definido'} (${armaMain})`;
            document.getElementById("elo-jogador").textContent = dados.elomax || "Sem ELO";
            document.getElementById("stance-jogador").textContent = dados.stanceAtiva || "Padrão";
            
            const valorCorehalla = dados.corehalla || dados.Corehalla;
            const linkCore = document.getElementById("corehalla-jogador");

            if (valorCorehalla && valorCorehalla.trim() !== "" && valorCorehalla !== '""') {
                const linkLimpo = valorCorehalla.replace(/"/g, '').trim();
                linkCore.href = linkLimpo;
                linkCore.textContent = "Ver Perfil ↗";
                document.getElementById("auto-corehalla").value = linkLimpo;
            } else {
                linkCore.textContent = "Não associado";
                linkCore.removeAttribute("href");
                document.getElementById("auto-corehalla").value = "";
            }

            document.getElementById("auto-legend").value = dados.mainLegend || "";
            document.getElementById("auto-armas").value = dados["ArmaMain's"] || "";
            document.getElementById("auto-elo").value = dados.elomax || "";
            if (dados.stanceAtiva) {
                document.getElementById("auto-stance").value = dados.stanceAtiva;
            }

            if (dados.patente === "Líder Supremo" || dados.patente === "Administrador") {
                eAdministrador = true;
                document.getElementById("sessao-admin").style.display = "block";
                document.querySelectorAll(".classe-th-controle").forEach(th => th.style.display = "table-cell");
                
                carregarSolicitacoesAlistamento();
            }

            await carregarTabelaTripulacao();
            carregarTutoriais();
            carregarEventos();
            
            await sincronizarModuloTorneio();
        }
    } catch (err) {
        console.error("Erro ao puxar dados do banco:", err);
    }
});

async function registrarAtividade(textoLog) {
    try {
        await addDoc(collection(db, "historico"), {
            texto: textoLog,
            timestamp: new Date()
        });
    } catch (e) {
        console.error("Erro ao registrar log de auditoria:", e);
    }
}

async function carregarLogs() {
    const container = document.getElementById("historico-logs");
    try {
        const logsQuery = query(collection(db, "historico"), orderBy("timestamp", "desc"), limit(5));
        const snap = await getDocs(logsQuery);
        
        if (snap.empty) {
            container.innerHTML = `<p style="color: var(--texto-mutado);">Sem atividades registradas na frota.</p>`;
            return;
        }

        container.innerHTML = "";
        snap.forEach(d => {
            const log = d.data();
            let dataFormatada = "Agora";
            if (log.timestamp) {
                const date = log.timestamp.toDate();
                dataFormatada = date.toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });
            }

            const div = document.createElement("div");
            div.className = "log-item";
            div.innerHTML = `
                <div class="log-data">${dataFormatada}</div>
                <div>${log.texto}</div>
            `;
            container.appendChild(div);
        });
    } catch (err) {
        container.innerHTML = `<p style="color: var(--texto-mutado);">Falha ao captar sinal de telemetria.</p>`;
    }
}

document.getElementById("form-auto-edicao").addEventListener("submit", async function(e) {
    e.preventDefault();
    const novoLegend = document.getElementById("auto-legend").value;
    const novasArmas = document.getElementById("auto-armas").value;
    const novoElo = document.getElementById("auto-elo").value;
    const novoCorehalla = document.getElementById("auto-corehalla").value.trim();
    const novaStance = document.getElementById("auto-stance").value;

    try {
        const docRef = doc(db, "membros", nomeSalvo);
        await updateDoc(docRef, {
            mainLegend: novoLegend,
            "ArmaMain's": novasArmas,
            elomax: novoElo,
            corehalla: novoCorehalla,
            stanceAtiva: novaStance
        });

        await registrarAtividade(`🚀 Piloto ${nomeSalvo} atualizou sua nave de combate: ${novoLegend} (${novaStance}).`);

        alert("Seu perfil tático foi atualizado com sucesso!");
        location.reload();
    } catch (err) {
        alert("Falha ao atualizar o seu perfil.");
    }
});

function calcularMetaDaFrota(membros) {
    const contagemLendas = {};
    const lendaStances = {};

    membros.forEach(m => {
        const lenda = m.mainLegend ? m.mainLegend.trim() : "Não definido";
        if (lenda === "Não definido") return;

        const stance = m.stanceAtiva || "Padrão";
        contagemLendas[lenda] = (contagemLendas[lenda] || 0) + 1;

        if (!lendaStances[lenda]) {
            lendaStances[lenda] = {};
        }
        lendaStances[lenda][stance] = (lendaStances[lenda][stance] || 0) + 1;
    });

    const containerLendas = document.getElementById("container-estatisticas-lendas");
    containerLendas.innerHTML = "";

    if (Object.keys(lendaStances).length === 0) {
        containerLendas.innerHTML = `<p style="color: var(--texto-mutado);">Sem dados de lenda cadastrados.</p>`;
    } else {
        for (const [lenda, stances] of Object.entries(lendaStances)) {
            const totalPilotos = contagemLendas[lenda];
            const lendaDiv = document.createElement("div");
            lendaDiv.className = "card-meta-lenda";
            
            let htmlStances = "";
            for (const [stance, qtd] of Object.entries(stances)) {
                const porcentagem = Math.round((qtd / totalPilotos) * 100);
                htmlStances += `
                    <div style="margin-top: 10px;">
                        <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
                            <span>⚙️ Stance: <strong>${stance}</strong></span>
                            <span style="color: var(--amarelo);">${qtd} piloto(s) (${porcentagem}%)</span>
                        </div>
                        <div class="barra-porcentagem">
                            <div class="progresso-porcentagem" style="width: ${porcentagem}%"></div>
                        </div>
                    </div>
                `;
            }

            lendaDiv.innerHTML = `
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 5px;">
                    <span style="font-family: 'Orbitron'; font-weight: bold; color: var(--amarelo);">${lenda}</span>
                    <span style="font-size: 0.85rem; color: var(--texto-mutado);">${totalPilotos} piloto(s) ativo(s)</span>
                </div>
                ${htmlStances}
            `;
            containerLendas.appendChild(lendaDiv);
        }
    }

    const containerRanking = document.getElementById("container-ranking-lendas");
    containerRanking.innerHTML = "";

    const rankingOrdenado = Object.entries(contagemLendas).sort((a, b) => b[1] - a[1]);

    if (rankingOrdenado.length === 0) {
        containerRanking.innerHTML = `<p style="color: var(--texto-mutado);">Nenhuma lenda registrada.</p>`;
    } else {
        rankingOrdenado.forEach(([lenda, qtd], index) => {
            const rankItem = document.createElement("div");
            rankItem.style = "display: flex; justify-content: space-between; align-items: center; padding: 10px; background: rgba(8, 18, 37, 0.4); border-radius: 4px; border-left: 3px solid var(--amarelo);";
            rankItem.innerHTML = `
                <div>
                    <span style="font-family: 'Orbitron'; font-weight: bold; color: var(--amarelo); margin-right: 10px;">#${index + 1}</span>
                    <span>${lenda}</span>
                </div>
                <span style="font-weight: bold; color: white;">${qtd}</span>
            `;
            containerRanking.appendChild(rankItem);
        });
    }
}

function renderizarTabelasMembros(membrosFiltrados) {
    const tbodyLideranca = document.getElementById("tabela-corpo-lideranca");
    const tbodyMembros = document.getElementById("tabela-corpo-membros");

    tbodyLideranca.innerHTML = "";
    tbodyMembros.innerHTML = "";

    let temLideranca = false;
    let temMembros = false;

    membrosFiltrados.forEach((m) => {
        const classeBadge = (m.patente === "Líder Supremo" || m.patente === "Administrador") ? "lider" : "";
        const linkCorehalla = m.corehalla ? m.corehalla.replace(/"/g, '').trim() : "";
        const stanceAtiva = m.stanceAtiva || "Padrão";

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${m.nome}</strong></td>
            <td><span class="badge-tabela ${classeBadge}">${m.patente || 'Membro'}</span></td>
            <td>${m.mainLegend || 'Não definido'} (${m["ArmaMain's"] || 'Não definido'})</td>
            <td style="color: var(--amarelo); font-family: 'Orbitron'; font-size: 0.85rem;"><strong>${stanceAtiva}</strong></td>
            <td>${m.elomax || 'Sem registro'}</td>
            <td>
                ${linkCorehalla ? `<a href="${linkCorehalla}" target="_blank" style="color: var(--amarelo); text-decoration:none;">Corehalla ↗</a>` : '<span style="color: var(--texto-mutado);">Sem link</span>'}
            </td>
            <td class="coluna-acoes" style="display: ${eAdministrador ? 'table-cell' : 'none'};">
                <button class="btn-excluir btn-excluir-acao" data-id="${m.id}" data-nome="${m.nome}">Remover</button>
            </td>
        `;

        if (m.patente === "Líder Supremo" || m.patente === "Administrador") {
            tbodyLideranca.appendChild(tr);
            temLideranca = true;
        } else {
            tbodyMembros.appendChild(tr);
            temMembros = true;
        }
    });

    if (!temLideranca) {
        tbodyLideranca.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--texto-mutado); padding: 20px;">Nenhum líder correspondente.</td></tr>`;
    }
    if (!temMembros) {
        tbodyMembros.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--texto-mutado); padding: 20px;">Nenhum piloto correspondente nesta busca.</td></tr>`;
    }

    if (eAdministrador) {
        document.querySelectorAll(".btn-excluir-acao").forEach(btn => {
            btn.onclick = async function() {
                const idParaRemover = this.getAttribute("data-id");
                const nomeParaRemover = this.getAttribute("data-nome");
                if (idParaRemover === nomeSalvo) {
                    alert("Você não pode ejetar a si mesmo da própria frota!");
                    return;
                }
                if (confirm(`Remover o piloto ${nomeParaRemover} da guilda?`)) {
                    await deleteDoc(doc(db, "membros", idParaRemover));
                    await registrarAtividade("⚠️ O comandante " + nomeSalvo + " desligou o piloto " + nomeParaRemover + " da tripulação.");
                    location.reload();
                }
            };
        });
    }
}

async function carregarTabelaTripulacao() {
    try {
        const querySnapshot = await getDocs(collection(db, "membros"));
        todosMembrosCache = [];

        querySnapshot.forEach((docSnap) => {
            const dados = docSnap.data();
            todosMembrosCache.push({
                id: docSnap.id,
                nome: dados.nome,
                patente: dados.patente || 'Membro',
                mainLegend: dados.mainLegend,
                "ArmaMain's": dados["ArmaMain's"],
                elomax: dados.elomax,
                corehalla: dados.corehalla || dados.Corehalla,
                stanceAtiva: dados.stanceAtiva || "Padrão"
            });
        });

        renderizarTabelasMembros(todosMembrosCache);
        calcularMetaDaFrota(todosMembrosCache);

    } catch (err) {
        console.error(err);
        document.getElementById("tabela-corpo-membros").innerHTML = "<tr><td colspan='7'>Erro na conexão do rádio de frota.</td></tr>";
    }
}

document.getElementById("campo-busca-membros").addEventListener("input", function(e) {
    const termo = e.target.value.toLowerCase().trim();

    if (!termo) {
        renderizarTabelasMembros(todosMembrosCache);
        return;
    }

    const filtrados = todosMembrosCache.filter(m => {
        const nomeMatch = m.nome && m.nome.toLowerCase().includes(termo);
        const legendMatch = m.mainLegend && m.mainLegend.toLowerCase().includes(termo);
        const armasMatch = m["ArmaMain's"] && m["ArmaMain's"].toLowerCase().includes(termo);
        const patenteMatch = m.patente && m.patente.toLowerCase().includes(termo);
        const stanceMatch = m.stanceAtiva && m.stanceAtiva.toLowerCase().includes(termo);

        return nomeMatch || legendMatch || armasMatch || patenteMatch || stanceMatch;
    });

    renderizarTabelasMembros(filtrados);
});

async function carregarSolicitacoesAlistamento() {
    const tbody = document.getElementById("tabela-corpo-alistamentos");
    tbody.innerHTML = "<tr><td colspan='7' style='text-align:center; color: var(--texto-mutado);'>Varrendo sinais de transmissão...</td></tr>";

    try {
        const querySnapshot = await getDocs(collection(db, "solicitacoes"));
        if (querySnapshot.empty) {
            tbody.innerHTML = "<tr><td colspan='7' style='text-align:center; color: var(--texto-mutado); padding: 20px;'>Nenhuma solicitação de alistamento na fila de triagem.</td></tr>";
            return;
        }

        tbody.innerHTML = "";
        querySnapshot.forEach((docSnap) => {
            const dados = docSnap.data();
            const idSolicitacao = docSnap.id;
            const coreLink = dados.corehalla ? dados.corehalla.replace(/"/g, '').trim() : "";

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${dados.nome}</strong></td>
                <td>${dados.mainLegend || 'Não definido'}</td>
                <td>${dados["ArmaMain's"] || 'Não definido'}</td>
                <td style="color: var(--amarelo); font-family: 'Orbitron'; font-size: 0.85rem;"><strong>${dados.stanceAtiva || 'Padrão'}</strong></td>
                <td>${dados.elomax || '0'}</td>
                <td>
                    ${coreLink ? `<a href="${coreLink}" target="_blank" style="color: var(--amarelo); text-decoration:none;">Ficha ↗</a>` : '<span style="color: var(--texto-mutado);">Sem link</span>'}
                </td>
                <td class="coluna-acoes">
                    <button class="btn-sucesso btn-aprovar-recruta" data-id="${idSolicitacao}">Aprovar</button>
                    <button class="btn-excluir btn-recusar-recruta" data-id="${idSolicitacao}" data-nome="${dados.nome}">Recusar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        document.querySelectorAll(".btn-aprovar-recruta").forEach(btn => {
            btn.onclick = async function() {
                const id = this.getAttribute("data-id");
                await processarAlistamento(id, true);
            };
        });

        document.querySelectorAll(".btn-recusar-recruta").forEach(btn => {
            btn.onclick = async function() {
                const id = this.getAttribute("data-id");
                const nomeRecruta = this.getAttribute("data-nome");
                if (confirm("Deseja rejeitar e apagar o alistamento de " + nomeRecruta + "?")) {
                    await processarAlistamento(id, false);
                }
            };
        });

    } catch (err) {
        console.error("Erro ao puxar solicitações:", err);
        tbody.innerHTML = "<tr><td colspan='7' style='text-align:center; color: var(--vermelho-erro);'>Sinal de recrutamento instável.</td></tr>";
    }
}

async function processarAlistamento(idDocumento, aprovado) {
    try {
        const docRefOriginal = doc(db, "solicitacoes", idDocumento);
        const docSnap = await getDoc(docRefOriginal);

        if (!docSnap.exists()) {
            alert("A solicitação expirou ou já foi processada.");
            carregarSolicitacoesAlistamento();
            return;
        }

        const dadosRecruta = docSnap.data();

        if (aprovado) {
            await setDoc(doc(db, "membros", dadosRecruta.nome), {
                nome: dadosRecruta.nome,
                patente: "Piloto", 
                mainLegend: dadosRecruta.mainLegend || "",
                "ArmaMain's": dadosRecruta["ArmaMain's"] || "",
                stanceAtiva: dadosRecruta.stanceAtiva || "Padrão",
                elomax: dadosRecruta.elomax || "0",
                corehalla: dadosRecruta.corehalla || ""
            });

            await deleteDoc(docRefOriginal);
            await registrarAtividade("🟢 Novo piloto recrutado! " + dadosRecruta.nome + " foi aprovado na triagem por " + nomeSalvo + ".");
            alert("O piloto " + dadosRecruta.nome + " foi integrado oficialmente à StarKindred!");
        } else {
            await deleteDoc(docRefOriginal);
            await registrarAtividade("🔴 Solicitação de alistamento do candidato " + dadosRecruta.nome + " recusada por " + nomeSalvo + ".");
            alert("Solicitação removida.");
        }

        carregarSolicitacoesAlistamento();
        carregarTabelaTripulacao();
        carregarLogs();

    } catch (err) {
        console.error("Erro ao processar recrutamento:", err);
        alert("Falha operacional ao processar solicitação.");
    }
}

async function carregarTutoriais() {
    const container = document.getElementById("lista-tutoriais");
    container.innerHTML = "";
    try {
        const snap = await getDocs(collection(db, "tutoriais"));
        if (snap.empty) {
            container.innerHTML = `<p style="color: var(--texto-mutado);">Nenhum tutorial tático ativo no momento.</p>`;
            return;
        }
        snap.forEach(d => {
            const t = d.data();
            let videoId = "";
            if(t.url) {
                videoId = t.url.split('v=')[1] || t.url.split('/').pop();
                if(videoId.includes('&')) {
                    videoId = videoId.split('&')[0];
                }
            }
            
            const card = document.createElement("div");
            card.className = "card-recurso";
            card.innerHTML = `
                <div>
                    <h3>${t.titulo}</h3>
                    <div class="iframe-container">
                        <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
                ${eAdministrador ? `<button class="btn-excluir" style="margin-top: 10px; width: 100%;" onclick="removerDado('tutoriais', '${d.id}', '${t.titulo}')">Excluir Tutorial</button>` : ""}
            `;
            container.appendChild(card);
        });
    } catch (err) {}
}

async function carregarEventos() {
    const container = document.getElementById("lista-eventos");
    container.innerHTML = "";
    try {
        const snap = await getDocs(collection(db, "eventos"));
        if (snap.empty) {
            container.innerHTML = `<p style="color: var(--texto-mutado);">Nenhum evento operacional agendado.</p>`;
            return;
        }
        snap.forEach(d => {
            const ev = d.data();
            const card = document.createElement("div");
            card.className = "card-recurso";
            card.innerHTML = `
                <div>
                    <h3>${ev.titulo}</h3>
                    <p style="color: var(--texto-mutado); font-size: 0.9rem; margin-bottom: 8px;">Status: <strong style="color: var(--amarelo);">${ev.status}</strong></p>
                    <p style="color: var(--texto-mutado); font-size: 0.9rem;">${ev.descricao || "Sem detalhes adicionais."}</p>
                </div>
                ${eAdministrador ? `<button class="btn-excluir" style="margin-top: 15px; width: 100%;" onclick="removerDado('eventos', '${d.id}', '${ev.titulo}')">Excluir Evento</button>` : ""}
            `;
            container.appendChild(card);
        });
    } catch (err) {}
}

window.publicarTutorial = async function() {
    const titulo = document.getElementById("adm-tut-titulo").value.trim();
    const url = document.getElementById("adm-tut-link").value.trim();

    if(!titulo || !url) {
        alert("Preencha todos os campos do tutorial!");
        return;
    }

    try {
        await addDoc(collection(db, "tutoriais"), { titulo, url });
        await registrarAtividade("📚 Novo tutorial tático publicado por " + nomeSalvo + ': "' + titulo + '".');
        alert("Novo tutorial publicado!");
        location.reload();
    } catch(e) {
        alert("Erro ao publicar tutorial.");
    }
};

window.publicarEvento = async function() {
    const titulo = document.getElementById("adm-evt-titulo").value.trim();
    const status = document.getElementById("adm-evt-status").value.trim();
    const descricao = document.getElementById("adm-evt-desc").value.trim();

    if(!titulo || !status || !descricao) {
        alert("Preencha todos os campos do evento!");
        return;
    }

    try {
        await addDoc(collection(db, "eventos"), { titulo, status, descricao });
        await registrarAtividade("🏆 Operação agendada por " + nomeSalvo + ': "' + titulo + '" (' + status + ').');
        alert("Novo evento publicado!");
        location.reload();
    } catch(e) {
        alert("Erro ao publicar evento.");
    }
};

window.removerDado = async function(colecao, id, rotulo) {
    if (confirm('Deseja apagar permanentemente o recurso "' + rotulo + '"?')) {
        try {
            await deleteDoc(doc(db, colecao, id));
            await registrarAtividade("🗑️ Recurso da central de \"" + colecao + "\" removido por " + nomeSalvo + ': "' + rotulo + '".');
            alert("Recurso removido com sucesso!");
            location.reload();
        } catch(e) {
            alert("Erro ao remover recurso.");
        }
    }
};

async function carregarComunicados() {
    const container = document.getElementById("conteiner-avisos");
    try {
        const docRef = doc(db, "avisos", "comunicado");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const dados = docSnap.data();
            container.innerHTML = `
                <div class="aviso-item">
                    <div class="aviso-data" style="font-family: 'Orbitron'; color: var(--amarelo); font-size: 0.8rem; margin-bottom: 5px;">${dados.data || 'DATA ESTELAR'}</div>
                    <div class="aviso-texto" style="font-size: 0.9rem;">${dados.texto || 'Nenhum comunicado ativo.'}</div>
                </div>
            `;
        }
    } catch (err) {}
}

document.getElementById("form-comunicado").addEventListener("submit", async function(e) {
    e.preventDefault();
    const dataSinal = document.getElementById("adm-aviso-data").value.trim();
    try {
        await setDoc(doc(db, "avisos", "comunicado"), {
            data: dataSinal,
            texto: document.getElementById("adm-aviso-texto").value.trim()
        });
        await registrarAtividade("📡 Comandante " + nomeSalvo + " atualizou os comunicados da nave de comando.");
        alert("Transmissão de aviso oficial atualizada!");
        location.reload();
    } catch (err) {}
});

document.getElementById("form-ajuste-membro").addEventListener("submit", async function(e) {
    e.preventDefault();
    const nickAlvo = document.getElementById("adm-membro-nick").value.trim();
    const novoLegend = document.getElementById("adm-membro-legend").value;
    const novoElo = document.getElementById("adm-membro-elo").value;
    const novaStance = document.getElementById("adm-membro-stance").value;
    try {
        const docRef = doc(db, "membros", nickAlvo);
        await updateDoc(docRef, {
            mainLegend: novoLegend,
            "ArmaMain's": document.getElementById("adm-membro-armas").value,
            elomax: novoElo,
            corehalla: document.getElementById("adm-membro-corehalla").value.trim(),
            stanceAtiva: novaStance
        });
        await registrarAtividade("⚙️ Os dados do piloto " + nickAlvo + " foram editados remotamente por " + nomeSalvo + ".");
        alert("Ficha do Piloto " + nickAlvo + " ajustada!");
        location.reload();
    } catch (err) {}
});

// SISTEMA NATIVO DE GERENCIAMENTO DE TORNEIOS (STARKINDRED BRACKETS)
async function sincronizarModuloTorneio() {
    try {
        const configRef = doc(db, "torneio_config", "global");
        const configSnap = await getDoc(configRef);
        
        let configuracoes = { status: "fechado", data: "Sábado", hora: "19:00 BRT" };
        if (configSnap.exists()) {
            configuracoes = configSnap.data();
        } else {
            await setDoc(configRef, configuracoes);
        }

        document.getElementById("torneio-data-display").textContent = configuracoes.data || "Sábado";
        document.getElementById("torneio-hora-display").textContent = configuracoes.hora || "19:00 BRT";
        
        if (eAdministrador) {
            document.getElementById("adm-torneio-data").value = configuracoes.data || "";
            document.getElementById("adm-torneio-hora").value = configuracoes.hora || "";
        }

        const inscritosSnapshot = await getDocs(collection(db, "torneio_inscritos"));
        const listaInscritos = [];
        inscritosSnapshot.forEach(d => listaInscritos.push(d.data()));

        const contagemInscritos = listaInscritos.length;
        document.getElementById("contagem-pilotos-torneio").textContent = contagemInscritos;

        const contGamerList = document.getElementById("pilotos-inscritos-lista");
        contGamerList.innerHTML = "";
        listaInscritos.forEach(p => {
            const span = document.createElement("span");
            span.className = p.checkin ? "badge-tabela checked-in" : "badge-tabela";
            span.textContent = p.nome + (p.checkin ? " (✔ Check-in)" : "");
            contGamerList.appendChild(span);
        });

        const painelStatus = document.getElementById("status-inscricoes");
        const jogadorInscritoObj = listaInscritos.find(p => p.nome === nomeSalvo);
        const jaInscrito = !!jogadorInscritoObj;
        const fezCheckIn = jogadorInscritoObj ? !!jogadorInscritoObj.checkin : false;

        const statusFase = document.getElementById("status-fase-torneio");

        if (configuracoes.status === "aberto") {
            statusFase.textContent = "Fase: Inscrições Abertas";
            statusFase.style.color = "var(--amarelo)";
            if (jaInscrito) {
                painelStatus.innerHTML = `
                    <p style="color: var(--verde-sucesso); font-weight:bold; margin-bottom: 10px;">🟢 VOCÊ ESTÁ INSCRITO NO TORNEIO!</p>
                    <p style="color: var(--texto-mutado); font-size: 0.85rem; margin-bottom: 15px;">Aguarde a liberação do check-in pela liderança para confirmar que vai jogar.</p>
                    <button class="btn-excluir" onclick="desinscreverJogador()" style="width:100%">Cancelar Inscrição</button>
                `;
            } else {
                painelStatus.innerHTML = `
                    <p style="color: var(--amarelo); margin-bottom: 10px;">As inscrições estão abertas para o próximo Torneio Estelar!</p>
                    <button class="btn-sucesso" onclick="inscreverJogador()" style="width:100%; font-weight:bold; padding:10px;">Inscrever-me Agora</button>
                `;
            }
        } else if (configuracoes.status === "checkin") {
            statusFase.textContent = "Fase: CHECK-IN ABERTO";
            statusFase.style.color = "#3a86ff";
            statusFase.style.borderColor = "#3a86ff";

            if (jaInscrito) {
                if (fezCheckIn) {
                    painelStatus.innerHTML = `
                        <p style="color: var(--verde-sucesso); font-weight:bold; margin-bottom: 10px;">✔ CHECK-IN REALIZADO COM SUCESSO!</p>
                        <p style="color: var(--texto-mutado); font-size: 0.85rem;">Seu caça está na rampa de lançamento. Aguarde a liderança gerar as chaves.</p>
                    `;
                } else {
                    painelStatus.innerHTML = `
                        <p style="color: #3a86ff; font-weight:bold; margin-bottom: 10px;">🚨 OS PORTÕES DE CHECK-IN ESTÃO ABERTOS!</p>
                        <p style="color: var(--texto-claro); font-size: 0.85rem; margin-bottom: 15px;">Você precisa realizar o check-in para confirmar que está ativo agora.</p>
                        <button class="btn-sucesso" onclick="confirmarCheckIn()" style="width:100%; font-weight:bold; padding:10px; background:#3a86ff; color:#fff; border-color:#3a86ff;">Confirmar Minha Presença (Check-In)</button>
                    `;
                }
            } else {
                painelStatus.innerHTML = `
                    <p style="color: var(--vermelho-erro); font-weight:bold; margin-bottom: 10px;">Portas Fechadas.</p>
                    <p style="color: var(--texto-mutado); font-size: 0.85rem;">As inscrições encerraram e o check-in está ativo para os participantes registrados.</p>
                `;
            }
        } else if (configuracoes.status === "andamento") {
            statusFase.textContent = "Fase: Em Andamento";
            statusFase.style.color = "var(--verde-sucesso)";
            statusFase.style.borderColor = "var(--verde-sucesso)";
            painelStatus.innerHTML = `
                <p style="color: var(--amarelo); font-weight:bold; margin-bottom: 10px;">⚔️ TORNEIO EM ANDAMENTO!</p>
                <p style="color: var(--texto-mutado); font-size: 0.85rem;">Confira o chaveamento de partidas ao lado.</p>
            `;
        } else {
            statusFase.textContent = "Fase: Fechado";
            statusFase.style.color = "var(--texto-mutado)";
            statusFase.style.borderColor = "var(--borda-suave)";
            painelStatus.innerHTML = `
                <p style="color: var(--texto-mutado);">Os portões de inscrição para competições estão fechados no momento.</p>
            `;
        }

        await carregarEExibirBrackets();

    } catch (err) {
        console.error("Erro ao processar dados de torneio:", err);
    }
}

window.inscreverJogador = async function() {
    try {
        const mSnap = await getDoc(doc(db, "membros", nomeSalvo));
        if (!mSnap.exists()) return;
        const mDados = mSnap.data();

        await setDoc(doc(db, "torneio_inscritos", nomeSalvo), {
            nome: nomeSalvo,
            elo: mDados.elomax || "0",
            checkin: false, 
            timestamp: new Date()
        });

        await registrarAtividade("🎮 Piloto " + nomeSalvo + " confirmou sua inscrição na arena de torneio.");
        alert("Sua inscrição foi confirmada na grade de decolagem!");
        location.reload();
    } catch (err) {
        alert("Não foi possível processar a sua inscrição estelar.");
    }
};

window.desinscreverJogador = async function() {
    if (confirm("Deseja retirar sua inscrição do torneio?")) {
        try {
            await deleteDoc(doc(db, "torneio_inscritos", nomeSalvo));
            await registrarAtividade("⚠️ Piloto " + nomeSalvo + " cancelou sua inscrição no torneio.");
            alert("Você se retirou da arena.");
            location.reload();
        } catch (err) {
            alert("Erro ao processar desincorporação.");
        }
    }
};

window.confirmarCheckIn = async function() {
    try {
        await updateDoc(doc(db, "torneio_inscritos", nomeSalvo), {
            checkin: true
        });
        await registrarAtividade("📡 Piloto " + nomeSalvo + " efetuou check-in e está pronto para o combate.");
        alert("Check-in efetuado com sucesso! Aguarde o início dos combates.");
        location.reload();
    } catch (err) {
        alert("Erro ao realizar check-in.");
    }
};

window.alterarStatusTorneio = async function(novoStatus) {
    try {
        const configRef = doc(db, "torneio_config", "global");
        await updateDoc(configRef, { status: novoStatus });
        
        let mensagemLog = "";
        if (novoStatus === "aberto") mensagemLog = "abriu as inscrições para o próximo torneio";
        else if (novoStatus === "checkin") mensagemLog = "iniciou a fase de CHECK-IN para o torneio ativo";
        else mensagemLog = "fechou o status do torneio";

        await registrarAtividade("⚙️ Comandante " + nomeSalvo + " " + mensagemLog + ".");
        alert("Status do Torneio alterado para: " + novoStatus.toUpperCase());
        location.reload();
    } catch (err) {
        alert("Falha ao configurar as inscrições.");
    }
};

window.atualizarAgendaTorneio = async function() {
    const dataTorneio = document.getElementById("adm-torneio-data").value.trim();
    const horaTorneio = document.getElementById("adm-torneio-hora").value.trim();

    if(!dataTorneio || !horaTorneio) {
        alert("Insira a data e a hora do torneio!");
        return;
    }

    try {
        const configRef = doc(db, "torneio_config", "global");
        await updateDoc(configRef, {
            data: dataTorneio,
            hora: horaTorneio
        });
        await registrarAtividade("📅 Comandante " + nomeSalvo + " agendou o torneio ativo para " + dataTorneio + " às " + horaTorneio + ".");
        alert("Cronograma do campeonato salvo!");
        location.reload();
    } catch (err) {
        alert("Erro ao atualizar agenda.");
    }
};

window.limparTorneioCompleto = async function() {
    if (confirm("⚠️ CUIDADO! Isso irá apagar todas as inscrições, check-ins, partidas e o bracket atual. Deseja redefinir tudo?")) {
        try {
            const inscSnapshot = await getDocs(collection(db, "torneio_inscritos"));
            const deleteInscPromises = inscSnapshot.docs.map(docSnap => deleteDoc(doc(db, "torneio_inscritos", docSnap.id)));
            await Promise.all(deleteInscPromises);

            const partSnapshot = await getDocs(collection(db, "torneio_partidas"));
            const deletePartPromises = partSnapshot.docs.map(docSnap => deleteDoc(doc(db, "torneio_partidas", docSnap.id)));
            await Promise.all(deletePartPromises);

            await setDoc(doc(db, "torneio_config", "global"), { 
                status: "fechado",
                data: "Sábado",
                hora: "19:00 BRT"
            });

            await registrarAtividade("🧹 Torneio completamente resetado e limpo por Comandante " + nomeSalvo + ".");
            alert("Redefinição total efetuada com sucesso!");
            location.reload();
        } catch (e) {
            alert("Erro ao resetar o torneio.");
        }
    }
};

async function carregarEExibirBrackets() {
    const container = document.getElementById("bracket-view");
    try {
        const snap = await getDocs(collection(db, "torneio_partidas"));
        if (snap.empty) {
            container.innerHTML = `<p style="color: var(--texto-mutado); text-align: center; width: 100%; padding: 40px 0;">Nenhum chaveamento ativo de combate gerado.</p>`;
            return;
        }

        const partidas = [];
        snap.forEach(d => partidas.push({ id: d.id, ...d.data() }));

        const rodadasMap = {};
        partidas.sort((a, b) => a.rodada - b.rodada);

        partidas.forEach(p => {
            if (!rodadasMap[p.rodada]) rodadasMap[p.rodada] = [];
            rodadasMap[p.rodada].push(p);
        });

        container.innerHTML = "";
        const totalDeRodadas = Object.keys(rodadasMap).length;

        for (let r = 1; r <= totalDeRodadas; r++) {
            const roundDiv = document.createElement("div");
            roundDiv.className = "bracket-round";

            let rotuloRodada = `Rodada ${r}`;
            if (r === totalDeRodadas) rotuloRodada = "Final";
            else if (r === totalDeRodadas - 1) rotuloRodada = "Semifinal";
            else if (r === totalDeRodadas - 2) rotuloRodada = "Quartas de Final";

            roundDiv.innerHTML = `<div class="bracket-round-title">${rotuloRodada}</div>`;

            rodadasMap[r].sort((a, b) => a.id.localeCompare(b.id));

            rodadasMap[r].forEach(m => {
                const matchCard = document.createElement("div");
                matchCard.className = `matchup-card ${m.status === 'jogando' ? 'active-match' : ''}`;

                matchCard.innerHTML = `
                    <div class="matchup-team ${m.vencedor === m.jogador1 && m.vencedor ? 'winner' : ''} ${!m.jogador1 ? 'bye' : ''}">
                        <span>${m.jogador1 || 'Aguardando...'}</span>
                        <span class="score-display">${m.jogador1 ? m.score1 : ''}</span>
                    </div>
                    <div class="matchup-team ${m.vencedor === m.jogador2 && m.vencedor ? 'winner' : ''} ${!m.jogador2 ? 'bye' : ''}">
                        <span>${m.jogador2 || 'Aguardando...'}</span>
                        <span class="score-display">${m.jogador2 ? m.score2 : ''}</span>
                    </div>
                `;
                roundDiv.appendChild(matchCard);
            });

            container.appendChild(roundDiv);
        }
    } catch (err) {
        console.error("Erro ao carregar chaveamento:", err);
    }
}