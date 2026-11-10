export interface MensagemHistorico {
  autor: string;
  texto: string;
  data: string;
}

export interface Chamado {
  id: number;
  assunto: string;
  descricao: string;
  categoria: string;
  dataCriacao: string;
  status: 'Aberto' | 'Em Andamento' | 'Concluído';
  usuarioEmail: string;
  anexoBase64?: string; // Anexo de imagem
  historico?: MensagemHistorico[]; // Troca de mensagens
}