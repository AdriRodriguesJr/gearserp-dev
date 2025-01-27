export const getStatusIcon = (status) => {
    switch (status) {
      case 'orcamento em andamento':
        return <i className="bi bi-clipboard" title="Orçamento em Andamento"></i>;
      case 'orcamento aprovado':
        return <i className="bi bi-clipboard-check" title="Orçamento Aprovado"></i>;
      case 'orcamento reprovado':
        return <i className="bi bi-clipboard-x" title="Orçamento Reprovado"></i>;
      case 'pendente':
        return <i className="bi bi-hourglass-split" title="OS Pendente"></i>;
      case 'em andamento':
        return <i className="bi bi-gear-wide-connected" title="OS em Andamento"></i>;
      case 'concluida':
        return <i className="bi bi-check-circle" title="OS Concluida"></i>;
      default:
        return <i className="bi bi-question-circle" title="Status Desconhecido"></i>;
    }
  };