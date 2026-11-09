export interface Chamado {
  id: number;
  assunto: string;
  descricao: string;
  categoria: string;
  dataCriacao: string;
  status: 'Aberto' | 'Em Andamento' | 'Concluído';
}