/**
 * MiroFish In-Memory Engine & Seed Data Store
 * Provides deterministic, stateful graph RAG, multi-agent simulation,
 * dual-platform (Twitter/Reddit) timeline actions, and Report Agent capabilities.
 */

export function createInitialSeedData() {
  const now = '2026-11-06T08:30:00.000Z'
  const earlier = '2026-11-05T14:20:00.000Z'

  const projects = {
    proj_whu2025: {
      project_id: 'proj_whu2025',
      name: 'Simulação de Opinião Pública: Política de Abertura na Temporada das Cerejeiras da Universidade de Wuhan',
      status: 'graph_completed',
      simulation_requirement:
        'Simular a evolução da opinião pública e os pontos de inflexão emocional entre estudantes, professores, ex-alunos, turistas e imprensa nas duas plataformas (Praça e Comunidade) após a universidade implementar a política de "Agendamento Nominal por Faixa de Horário + Canal Verde para Ex-Alunos + Sessão Noturna Pública" durante a florada das cerejeiras.',
      graph_id: 'graph_whu2025',
      graph_build_task_id: 'task_build_whu2025',
      analysis_summary:
        'Os documentos abrangem o regulamento de gestão de abertura do campus universitário, estatísticas históricas de fluxo de visitantes na temporada das cerejeiras e controvérsias em redes sociais. A tensão central concentra-se no equilíbrio entre a preservação da ordem acadêmica e de pesquisa e o compartilhamento de recursos culturais públicos.',
      files: [
        { filename: 'Regulamento_Abertura_Campus_Revisao_2026.pdf', size: 428190 },
        { filename: 'Amostras_Fluxo_e_Opiniao_Temporada_Cerejeiras.md', size: 184320 },
        { filename: 'Atas_Entrevistas_Governanca_Espaco_Publico.txt', size: 92400 }
      ],
      total_text_length: 28450,
      chunk_size: 500,
      chunk_overlap: 50,
      created_at: now,
      ontology: {
        entity_types: [
          {
            name: 'UniversityAdmin',
            description: 'Departamentos administrativos e de segurança da universidade, responsáveis pela política de agendamento e manutenção da ordem no campus',
            attributes: [
              { name: 'department', type: 'string', description: 'Departamento funcional vinculado' },
              { name: 'policy_stance', type: 'string', description: 'Orientação da política e estratégia de resposta' }
            ],
            examples: ['Departamento de Segurança do Campus', 'Gabinete Administrativo', 'Centro de Tecnologia da Informação']
          },
          {
            name: 'CampusGroup',
            description: 'Estudantes, docentes, pesquisadores e grupos de voluntários diretamente impactados pelo fluxo de visitantes no campus',
            attributes: [
              { name: 'role', type: 'string', description: 'Papel no campus' },
              { name: 'concern_focus', type: 'string', description: 'Foco principal de preocupação' }
            ],
            examples: ['Representantes dos Graduandos', 'Pesquisadores de Laboratório', 'Equipe Voluntária da Avenida das Cerejeiras']
          },
          {
            name: 'PublicVisitor',
            description: 'Visitantes do público geral, fotógrafos de outras cidades e grupos de ex-alunos',
            attributes: [
              { name: 'visitor_type', type: 'string', description: 'Perfil de origem do visitante' },
              { name: 'booking_channel', type: 'string', description: 'Canal de agendamento preferido' }
            ],
            examples: ['Delegação de Ex-Alunos', 'Criadores de Conteúdo de Viagem', 'Famílias Visitantes Locais']
          },
          {
            name: 'MediaOutlet',
            description: 'Veículos de imprensa especializados em ensino superior, portais de cultura e turismo e comentaristas de opinião pública',
            attributes: [
              { name: 'media_tier', type: 'string', description: 'Nível de alcance da mídia' },
              { name: 'influence_index', type: 'number', description: 'Peso de influência na opinião pública' }
            ],
            examples: ['Revista Observatório do Ensino Superior', 'Diário Cidadão de Wuhan', 'Fórum Juventude Universitária']
          },
          {
            name: 'PolicyMeasure',
            description: 'Medidas concretas de gestão e mecanismos digitais de agendamento',
            attributes: [
              { name: 'capacity_limit', type: 'string', description: 'Descrição do limite de capacidade' },
              { name: 'implementation_phase', type: 'string', description: 'Fase de execução' }
            ],
            examples: ['Limite de 30 mil vagas em dias úteis', 'Canal isento de sorteio para ex-alunos', 'Controle de acesso por cartão nos prédios acadêmicos']
          }
        ],
        edge_types: [
          {
            name: 'ISSUES_POLICY',
            description: 'A administração publica ou ajusta uma medida da política de abertura do campus',
            attributes: [{ name: 'effective_date', type: 'string', description: 'Data de entrada em vigor' }],
            source_targets: [{ source: 'UniversityAdmin', target: 'PolicyMeasure' }]
          },
          {
            name: 'DEBATES_ON',
            description: 'Diferentes atores sociais e universitários debatem e negociam publicamente em torno das medidas',
            attributes: [{ name: 'sentiment_polarity', type: 'string', description: 'Polaridade emocional' }],
            source_targets: [
              { source: 'CampusGroup', target: 'PolicyMeasure' },
              { source: 'PublicVisitor', target: 'PolicyMeasure' }
            ]
          },
          {
            name: 'AMPLIFIES_OPINION',
            description: 'A mídia ou líderes de opinião pautam e amplificam as demandas de grupos específicos',
            attributes: [{ name: 'reach_multiplier', type: 'number', description: 'Multiplicador de alcance' }],
            source_targets: [
              { source: 'MediaOutlet', target: 'CampusGroup' },
              { source: 'MediaOutlet', target: 'PublicVisitor' }
            ]
          }
        ]
      }
    },
    proj_hlm1791: {
      project_id: 'proj_hlm1791',
      name: 'Simulação de Opinião em "O Sonho da Câmara Vermelha": Reforma do Jardim da Grande Vista e Crise Fiscal da Mansão Rongguo',
      status: 'graph_completed',
      simulation_requirement:
        'Com base nos primeiros oitenta capítulos de "O Sonho da Câmara Vermelha", simular as reações coletivas e a propagação de rumores entre os senhores das mansões Rong e Ning, governantas, jovens moradores do Jardim da Grande Vista e agregados após a reforma de responsabilidade contratual liderada por Jia Tanchun e o corte de despesas supérfluas.',
      graph_id: 'graph_hlm1791',
      graph_build_task_id: 'task_build_hlm1791',
      analysis_summary:
        'Constrói a rede de poder familiar e o grafo de comunicação interpessoal em torno do déficit contábil da Mansão Rongguo, da manutenção do jardim imperial e da reforma de arrendamento interno promovida por Tanchun.',
      files: [
        { filename: 'Sonho_Camara_Vermelha_Reforma_Tanchun_e_Financas.md', size: 312800 },
        { filename: 'Relacoes_Mansao_Rongguo_e_Tabela_Mesadas.pdf', size: 519200 }
      ],
      total_text_length: 41200,
      chunk_size: 500,
      chunk_overlap: 50,
      created_at: earlier,
      ontology: {
        entity_types: [
          {
            name: 'NobleMaster',
            description: 'Núcleo decisório das mansões Rong e Ning e jovens nobres do Jardim da Grande Vista',
            attributes: [{ name: 'residence', type: 'string', description: 'Pavilhão de residência' }],
            examples: ['Avó Jia', 'Wang Xifeng', 'Jia Tanchun', 'Jia Baoyu', 'Lin Daiyu']
          },
          {
            name: 'StewardServant',
            description: 'Governantas internas, encarregados da tesouraria e criadas principais de cada ala',
            attributes: [{ name: 'duty', type: 'string', description: 'Função atribuída' }],
            examples: ['Ping\'er', 'Esposa de Lai Da', 'Esposa de Lin Zhixiao', 'Xiren']
          },
          {
            name: 'ReformPolicy',
            description: 'Iniciativas de contenção de gastos e arrendamento produtivo do jardim',
            attributes: [{ name: 'annual_saving', type: 'string', description: 'Economia anual estimada em prata' }],
            examples: ['Arrendamento de bambuzais e pomares às zeladoras', 'Eliminação de verbas duplicadas de cosméticos', 'Auditoria trimestral das mesadas']
          }
        ],
        edge_types: [
          {
            name: 'MANAGES_AFFAIR',
            description: 'Lidera ou auxilia na reforma financeira e administrativa interna do clã',
            attributes: [],
            source_targets: [{ source: 'NobleMaster', target: 'ReformPolicy' }]
          },
          {
            name: 'SPREADS_RUMOR',
            description: 'Propaga comentários e queixas de interesses nos pátios internos e alojamentos',
            attributes: [],
            source_targets: [{ source: 'StewardServant', target: 'ReformPolicy' }]
          }
        ]
      }
    }
  }

  const graphs = {
    graph_whu2025: {
      graph_id: 'graph_whu2025',
      node_count: 8,
      edge_count: 9,
      nodes: [
        {
          uuid: 'node_whu_1',
          name: 'Comitê Conjunto de Segurança e Administração',
          labels: ['Entity', 'UniversityAdmin'],
          summary: 'Responsável por coordenar a alocação de vagas de agendamento nominal, validação nas catracas e escoamento de emergência durante a temporada das cerejeiras.',
          attributes: { department: 'Departamento de Segurança', policy_stance: 'Abertura ordenada, prioridade ao ensino' },
          created_at: now
        },
        {
          uuid: 'node_whu_2',
          name: 'Agendamento por Horário e Sessão Noturna Pública',
          labels: ['Entity', 'PolicyMeasure'],
          summary: 'Limite de 30 mil visitantes em dias úteis e 40 mil nos fins de semana, com sessão noturna adicional das 18:30 às 21:30 e controle rigoroso nas áreas acadêmicas.',
          attributes: { capacity_limit: '30.000-40.000/dia', implementation_phase: 'Operação oficial' },
          created_at: now
        },
        {
          uuid: 'node_whu_3',
          name: 'Pós-Graduandos e Grupos de Pesquisa em Laboratório',
          labels: ['Entity', 'CampusGroup'],
          summary: 'Preocupados com a superlotação dos refeitórios no horário de pico, ruído ao redor da biblioteca e acesso de veículos de suprimentos laboratoriais.',
          attributes: { role: 'Corpo Docente e Discente', concern_focus: 'Ordem na pesquisa e nas refeições' },
          created_at: now
        },
        {
          uuid: 'node_whu_4',
          name: 'Associação de Voluntários Guias das Cerejeiras',
          labels: ['Entity', 'CampusGroup'],
          summary: 'Equipe de orientação voluntária formada por estudantes de graduação que promove a visitação consciente e apresenta a história arquitetônica do campus.',
          attributes: { role: 'Associação Estudantil', concern_focus: 'Orientação cívica e divulgação histórica' },
          created_at: now
        },
        {
          uuid: 'node_whu_5',
          name: 'Comunidade de Fotógrafos e Criadores de Turismo',
          labels: ['Entity', 'PublicVisitor'],
          summary: 'Acompanham de perto a taxa de contemplação no sorteio, os pontos de iluminação noturna e as regras para uso de drones.',
          attributes: { visitor_type: 'Criadores Independentes', booking_channel: 'Mini-app Oficial' },
          created_at: now
        },
        {
          uuid: 'node_whu_6',
          name: 'Delegação de Ex-Alunos Visitantes',
          labels: ['Entity', 'PublicVisitor'],
          summary: 'Ingressam no campus pelo canal verde do cartão digital de ex-aluno e participam ativamente de doações ao fundo cultural universitário.',
          attributes: { visitor_type: 'Ex-Alunos Diplomados', booking_channel: 'Sistema de Ex-Alunos (Sem Sorteio)' },
          created_at: now
        },
        {
          uuid: 'node_whu_7',
          name: 'Revista Observatório do Ensino Superior',
          labels: ['Entity', 'MediaOutlet'],
          summary: 'Veículo de reportagens aprofundadas focado no grau de abertura das universidades públicas e nos limites de capacidade do campus.',
          attributes: { media_tier: 'Mídia Nacional de Educação', influence_index: 92 },
          created_at: now
        },
        {
          uuid: 'node_whu_8',
          name: 'Rede de Controle de Acesso dos Prédios Acadêmicos',
          labels: ['Entity', 'PolicyMeasure'],
          summary: 'Implementa separação física por cartão magnético nos prédios de ciências, biblioteca e dormitórios para evitar a entrada acidental de turistas em salas de aula.',
          attributes: { capacity_limit: 'Acesso exclusivo para alunos e professores', implementation_phase: 'Ativo 24 horas' },
          created_at: now
        }
      ],
      edges: [
        {
          uuid: 'edge_whu_1',
          source_node_uuid: 'node_whu_1',
          target_node_uuid: 'node_whu_2',
          name: 'ISSUES_POLICY',
          fact_type: 'ISSUES_POLICY',
          fact: 'O Comitê Conjunto de Segurança e Administração lançou oficialmente o agendamento nominal por faixa de horário e a sessão noturna pública, abrindo o sorteio online com 3 dias de antecedência.',
          episodes: ['ep_policy_01', 'ep_notice_02'],
          created_at: now,
          valid_at: now
        },
        {
          uuid: 'edge_whu_2',
          source_node_uuid: 'node_whu_1',
          target_node_uuid: 'node_whu_8',
          name: 'ISSUES_POLICY',
          fact_type: 'ISSUES_POLICY',
          fact: 'A administração implantou linhas de controle de acesso ao redor de salas de aula e laboratórios para garantir o andamento normal das aulas e pesquisas.',
          episodes: ['ep_policy_03'],
          created_at: now,
          valid_at: now
        },
        {
          uuid: 'edge_whu_3',
          source_node_uuid: 'node_whu_3',
          target_node_uuid: 'node_whu_8',
          name: 'DEBATES_ON',
          fact_type: 'DEBATES_ON',
          fact: 'Os pós-graduandos apoiam amplamente o controle de acesso nas áreas acadêmicas e sugerem a criação de guichês exclusivos de refeição rápida para alunos e professores.',
          episodes: ['ep_forum_04'],
          created_at: now,
          valid_at: now
        },
        {
          uuid: 'edge_whu_4',
          source_node_uuid: 'node_whu_5',
          target_node_uuid: 'node_whu_2',
          name: 'DEBATES_ON',
          fact_type: 'DEBATES_ON',
          fact: 'Fotógrafos de viagem elogiam a sessão noturna por ampliar a janela de fotos, mas pedem repressão rigorosa contra cambistas automatizados.',
          episodes: ['ep_plaza_05'],
          created_at: now,
          valid_at: now
        },
        {
          uuid: 'edge_whu_5',
          source_node_uuid: 'node_whu_6',
          target_node_uuid: 'node_whu_2',
          name: 'DEBATES_ON',
          fact_type: 'DEBATES_ON',
          fact: 'Ex-alunos aprovam a agilidade do canal verde digital e publicam apelos voluntários para que colegas visitem o campus fora dos horários de pico.',
          episodes: ['ep_alumni_06'],
          created_at: now,
          valid_at: now
        },
        {
          uuid: 'edge_whu_6',
          source_node_uuid: 'node_whu_4',
          target_node_uuid: 'node_whu_5',
          name: 'DEBATES_ON',
          fact_type: 'DEBATES_ON',
          fact: 'A associação de voluntários uniu-se a criadores de conteúdo para lançar a campanha "Visitação Consciente: Não Quebre Ramos, Preserve os Gramados".',
          episodes: ['ep_co_07'],
          created_at: now,
          valid_at: now
        },
        {
          uuid: 'edge_whu_7',
          source_node_uuid: 'node_whu_7',
          target_node_uuid: 'node_whu_2',
          name: 'AMPLIFIES_OPINION',
          fact_type: 'AMPLIFIES_OPINION',
          fact: 'A Revista Observatório do Ensino Superior publicou análise especial destacando que o modelo "agendamento por faixa + separação física" oferece um paradigma replicável para universidades públicas.',
          episodes: ['ep_media_08'],
          created_at: now,
          valid_at: now
        },
        {
          uuid: 'edge_whu_8',
          source_node_uuid: 'node_whu_7',
          target_node_uuid: 'node_whu_3',
          name: 'AMPLIFIES_OPINION',
          fact_type: 'AMPLIFIES_OPINION',
          fact: 'A imprensa citou dados de pesquisa interna apontando que o abastecimento alimentar escalonado é a variável-chave para elevar a satisfação da comunidade acadêmica.',
          episodes: ['ep_media_09'],
          created_at: now,
          valid_at: now
        },
        {
          uuid: 'edge_whu_9',
          source_node_uuid: 'node_whu_4',
          target_node_uuid: 'node_whu_2',
          name: 'DEBATES_ON',
          fact_type: 'DEBATES_ON',
          fact: 'A equipe de voluntários relatou que a sinalização clara das rotas noturnas reduziu significativamente a retenção de visitantes na saída.',
          episodes: ['ep_vol_10'],
          created_at: now,
          valid_at: now
        }
      ]
    },
    graph_hlm1791: {
      graph_id: 'graph_hlm1791',
      node_count: 5,
      edge_count: 5,
      nodes: [
        {
          uuid: 'node_hlm_1',
          name: 'Jia Tanchun (Terceira Senhorita)',
          labels: ['Entity', 'NobleMaster'],
          summary: 'Assume a administração interina da Mansão Rongguo e implementa a reforma de arrendamento contratual das plantas e pomares do Jardim da Grande Vista.',
          attributes: { residence: 'Estúdio da Brisa de Outono' },
          created_at: earlier
        },
        {
          uuid: 'node_hlm_2',
          name: 'Wang Xifeng (Senhora Lian)',
          labels: ['Entity', 'NobleMaster'],
          summary: 'Administradora titular da Mansão Rongguo; durante sua convalescença, transmite por meio de Ping\'er seu apoio irrestrito às reformas de Tanchun.',
          attributes: { residence: 'Pátio de Jia Lian' },
          created_at: earlier
        },
        {
          uuid: 'node_hlm_3',
          name: 'Ping\'er',
          labels: ['Entity', 'StewardServant'],
          summary: 'Braço direito de Wang Xifeng, atua como mediadora equilibrando as medidas reformistas e as antigas governantas da casa.',
          attributes: { duty: 'Coordenação das contas internas' },
          created_at: earlier
        },
        {
          uuid: 'node_hlm_4',
          name: 'Sistema de Arrendamento do Jardim da Grande Vista',
          labels: ['Entity', 'ReformPolicy'],
          summary: 'Confia o cuidado dos bambuzais, hortas e jardins florais a zeladoras veteranas dedicadas, gerando economia e receita anual superior a 400 taéis de prata.',
          attributes: { annual_saving: 'Mais de 400 taéis de prata' },
          created_at: earlier
        },
        {
          uuid: 'node_hlm_5',
          name: 'Tesouraria Interna e Encarregadas de Compras',
          labels: ['Entity', 'StewardServant'],
          summary: 'Governantas que antes obtinham comissões paralelas com a compra duplicada de cosméticos, óleos e manutenção avulsa do jardim.',
          attributes: { duty: 'Compras e serviços gerais' },
          created_at: earlier
        }
      ],
      edges: [
        {
          uuid: 'edge_hlm_1',
          source_node_uuid: 'node_hlm_1',
          target_node_uuid: 'node_hlm_4',
          name: 'MANAGES_AFFAIR',
          fact_type: 'MANAGES_AFFAIR',
          fact: 'Jia Tanchun, junto a Li Wan e Xue Baochai, instituiu o sistema de arrendamento do Jardim da Grande Vista, eliminando desperdícios de intermediários e incentivando as zeladoras.',
          episodes: ['ep_hlm_56'],
          created_at: earlier,
          valid_at: earlier
        },
        {
          uuid: 'edge_hlm_2',
          source_node_uuid: 'node_hlm_2',
          target_node_uuid: 'node_hlm_1',
          name: 'MANAGES_AFFAIR',
          fact_type: 'MANAGES_AFFAIR',
          fact: 'Wang Xifeng elogiou a visão administrativa de Tanchun e instruiu Ping\'er a cooperar integralmente na implementação das reformas.',
          episodes: ['ep_hlm_55'],
          created_at: earlier,
          valid_at: earlier
        },
        {
          uuid: 'edge_hlm_3',
          source_node_uuid: 'node_hlm_3',
          target_node_uuid: 'node_hlm_4',
          name: 'MANAGES_AFFAIR',
          fact_type: 'MANAGES_AFFAIR',
          fact: 'Ping\'er conteve com firmeza e diplomacia as governantas das alas, garantindo a assinatura tranquila dos contratos de cuidado do jardim.',
          episodes: ['ep_hlm_56b'],
          created_at: earlier,
          valid_at: earlier
        },
        {
          uuid: 'edge_hlm_4',
          source_node_uuid: 'node_hlm_5',
          target_node_uuid: 'node_hlm_4',
          name: 'SPREADS_RUMOR',
          fact_type: 'SPREADS_RUMOR',
          fact: 'As antigas encarregadas de compras queixaram-se em particular do corte de verbas duplicadas, mas as zeladoras idosas do jardim apoiaram entusiasticamente a nova política.',
          episodes: ['ep_hlm_56c'],
          created_at: earlier,
          valid_at: earlier
        },
        {
          uuid: 'edge_hlm_5',
          source_node_uuid: 'node_hlm_3',
          target_node_uuid: 'node_hlm_5',
          name: 'MANAGES_AFFAIR',
          fact_type: 'MANAGES_AFFAIR',
          fact: 'Ping\'er combinou autoridade e benevolência para reorganizar a disciplina interna e dissipar a resistência das governantas.',
          episodes: ['ep_hlm_57'],
          created_at: earlier,
          valid_at: earlier
        }
      ]
    }
  }

  const profilesBySim = {
    sim_whu2025: [
      {
        user_id: 0,
        username: 'Lin Zhiyuan · Doutorando em Computação',
        name: 'lin_zhiyuan_cs',
        profession: 'Doutorando / Monitor de Laboratório',
        entity_type: 'CampusGroup',
        age: 25,
        gender: 'male',
        mbti: 'INTJ',
        country: 'Brasil / China',
        bio: 'Pesquisador residente no laboratório de Informática; apoia a abertura cultural do campus, mas defende silêncio rigoroso nos prédios de pesquisa e filas escalonadas nos refeitórios.',
        persona: 'Racional e pragmático, costuma argumentar com dados de tempo de fila e mapas de calor de fluxo humano, gozando de alta credibilidade técnica na comunidade.',
        interested_topics: ['Controle de acesso acadêmico', 'Refeições escalonadas', 'Agendamento nominal anti-cambistas'],
        karma: 1420,
        follower_count: 860,
        following_count: 190,
        post_count: 14
      },
      {
        user_id: 1,
        username: 'Su Qing · Voluntária Guia das Cerejeiras',
        name: 'suqing_volunteer',
        profession: 'Graduanda em Jornalismo / Líder dos Guias Voluntários',
        entity_type: 'CampusGroup',
        age: 21,
        gender: 'female',
        mbti: 'ENFJ',
        country: 'Brasil / China',
        bio: 'Guia voluntária na Avenida das Cerejeiras há três anos consecutivos, apaixonada por compartilhar os melhores roteiros e a história arquitetônica da universidade.',
        persona: 'Acolhedora e empática, constrói pontes de compreensão mútua entre turistas visitantes e estudantes residentes.',
        interested_topics: ['Campanha de visitação consciente', 'Roteiro da sessão noturna', 'História da arquitetura universitária'],
        karma: 2150,
        follower_count: 1940,
        following_count: 310,
        post_count: 22
      },
      {
        user_id: 2,
        username: 'Chen Mo · Fotógrafo de Paisagem Urbana',
        name: 'chenmo_photo',
        profession: 'Criador Independente de Fotografia e Viagem',
        entity_type: 'PublicVisitor',
        age: 31,
        gender: 'male',
        mbti: 'ISFP',
        country: 'Brasil / China',
        bio: 'Criador visual que registra universidades e patrimônios históricos, atento ao desenho de iluminação noturna e à justiça no sorteio de vagas.',
        persona: 'Esteticamente exigente, opõe-se à revenda ilegal de agendamentos gratuitos e promove a fotografia noturna fora do horário de pico.',
        interested_topics: ['Pontos de foto na sessão noturna', 'Mecanismo de sorteio nominal', 'Bloqueio técnico de cambistas'],
        karma: 3890,
        follower_count: 12500,
        following_count: 420,
        post_count: 31
      },
      {
        user_id: 3,
        username: 'Zhou Jianguo · Supervisor de Segurança do Campus',
        name: 'campus_security_zhou',
        profession: 'Coordenador de Segurança Universitária e Tráfego',
        entity_type: 'UniversityAdmin',
        age: 42,
        gender: 'male',
        mbti: 'ESTJ',
        country: 'Brasil / China',
        bio: 'Responsável pela verificação nas catracas de entrada, manutenção de corredores de emergência e alertas de pico de público durante a temporada das cerejeiras.',
        persona: 'Rigoroso e prestativo, prioriza a rapidez de resposta a emergências e a transparência das informações públicas.',
        interested_topics: ['Alerta de pico de visitantes', 'Canal verde para ex-alunos', 'Suporte médico de emergência'],
        karma: 980,
        follower_count: 2300,
        following_count: 85,
        post_count: 9
      },
      {
        user_id: 4,
        username: 'He Yingxue · Editora do Observatório Superior',
        name: 'he_yingxue_edu',
        profession: 'Comentarista de Políticas de Ensino Superior',
        entity_type: 'MediaOutlet',
        age: 36,
        gender: 'female',
        mbti: 'ENTP',
        country: 'Brasil / China',
        bio: 'Acompanha há anos a função social das universidades públicas e a modernização da governança universitária com base em análise de dados.',
        persona: 'Analítica e objetiva, especialista em extrair metodologias de governança pública a partir de estudos de caso.',
        interested_topics: ['Fronteiras públicas da universidade', 'Governança digital de agendamentos', 'Pontos de inflexão da opinião pública'],
        karma: 4600,
        follower_count: 28400,
        following_count: 510,
        post_count: 45
      },
      {
        user_id: 5,
        username: 'Zhao Mingxuan · Ex-Aluno Turma de 2008',
        name: 'zhao_alumni_08',
        profession: 'Diretor de Produto em Tecnologia / Conselheiro da Associação de Ex-Alunos',
        entity_type: 'PublicVisitor',
        age: 37,
        gender: 'male',
        mbti: 'ENTJ',
        country: 'Brasil / China',
        bio: 'Formado há quinze anos, visita regularmente a alma mater e incentiva os ex-alunos a optarem por horários alternativos e apoiarem o fundo filantrópico do campus.',
        persona: 'Nostálgico e construtivo, engajado em mobilizar recursos de ex-alunos em prol dos serviços públicos internos.',
        interested_topics: ['Canal sem sorteio para ex-alunos', 'Visitação fora de pico', 'Voluntariado e fundo universitário'],
        karma: 1760,
        follower_count: 1520,
        following_count: 260,
        post_count: 12
      }
    ],
    sim_hlm1791: [
      {
        user_id: 0,
        username: 'Jia Tanchun · Senhora do Estúdio de Outono',
        name: 'jia_tanchun',
        profession: 'Terceira Senhorita e Co-Administradora da Mansão Rongguo',
        entity_type: 'NobleMaster',
        age: 17,
        gender: 'female',
        mbti: 'ENTJ',
        country: 'China Clássica',
        bio: 'Perspicaz e decidida, criou o sistema de responsabilidade contratual para cuidar dos jardins e pomares do Jardim da Grande Vista, cortando despesas duplicadas.',
        persona: 'Ambiciosa e imparcial, zela pelo sustento das zeladoras idosas do jardim enquanto rejeita firmemente gastos fora das regras.',
        interested_topics: ['Reforma de contenção de gastos', 'Arrendamento produtivo do jardim', 'Combate a abusos de intermediários'],
        karma: 2800,
        follower_count: 3200,
        following_count: 120,
        post_count: 18
      },
      {
        user_id: 1,
        username: 'Ping\'er · Fiel Escudeira da Senhora Lian',
        name: 'ping_er_steward',
        profession: 'Criada-Chefe e Coordenadora Interna da Mansão Rongguo',
        entity_type: 'StewardServant',
        age: 19,
        gender: 'female',
        mbti: 'INFJ',
        country: 'China Clássica',
        bio: 'Auxilia Tanchun, Li Wan e Baochai na execução das novas regras do jardim, preservando a dignidade de todos e atendendo às dificuldades reais dos servos.',
        persona: 'Prudente e diplomática, combina firmeza e empatia para pacificar conflitos antes que se agravem.',
        interested_topics: ['Mediação nos pátios internos', 'Seleção das zeladoras contratadas', 'Distribuição justa das mesadas'],
        karma: 2450,
        follower_count: 2600,
        following_count: 180,
        post_count: 15
      },
      {
        user_id: 2,
        username: 'Mãe Zhu · Zeladora dos Bambuzais de Xiaoxiang',
        name: 'zhuma_bamboo',
        profession: 'Zeladora Contratada dos Bambuzais e Pomares',
        entity_type: 'StewardServant',
        age: 52,
        gender: 'female',
        mbti: 'ISFJ',
        country: 'China Clássica',
        bio: 'De família experiente no cultivo de bambus e brotos, assumiu o cuidado dos bambuzais do Pavilhão Xiaoxiang com direito aos excedentes anuais.',
        persona: 'Trabalhadora e dedicada, profundamente grata à política de Tanchun que isenta a produção da tesouraria central.',
        interested_topics: ['Cultivo de bambus imperiais', 'Cota sazonal de brotos de primavera', 'Partilha dos lucros de fim de ano'],
        karma: 890,
        follower_count: 420,
        following_count: 60,
        post_count: 8
      }
    ]
  }

  const buildConfigForSim = (simId, profiles) => ({
    simulation_id: simId,
    time_config: {
      total_simulation_hours: 24,
      minutes_per_round: 30,
      agents_per_hour_min: 3,
      agents_per_hour_max: 6,
      peak_hours: [19, 20, 21, 22],
      peak_activity_multiplier: 1.8,
      work_hours: [9, 10, 11, 14, 15, 16, 17],
      work_activity_multiplier: 1.2,
      morning_hours: [7, 8],
      morning_activity_multiplier: 0.9,
      off_peak_hours: [0, 1, 2, 3, 4, 5, 6, 23],
      off_peak_activity_multiplier: 0.3
    },
    event_config: {
      narrative_direction:
        simId === 'sim_hlm1791'
          ? 'Após o anúncio da reforma de Tanchun, surgem murmúrios iniciais entre as encarregadas de compras, mas com a mediação de Ping\'er e o apoio das zeladoras do jardim, a opinião converte-se rapidamente em elogios.'
          : 'No início da divulgação da política, o debate concentra-se na taxa de sorteio e no silêncio nas áreas de ensino; com a abertura da sessão noturna e o bloqueio de cambistas, o sentimento positivo cresce expressivamente.',
      hot_topics:
        simId === 'sim_hlm1791'
          ? ['Arrendamento dos bambuzais e pomares', 'Corte de verbas duplicadas de cosméticos', 'Mediação de Ping\'er nos pátios internos']
          : ['Taxa de aprovação no agendamento nominal', 'Controle por cartão nos prédios de ensino', 'Experiência na sessão noturna da Avenida das Cerejeiras'],
      initial_posts:
        simId === 'sim_hlm1791'
          ? [
              {
                poster_type: 'NobleMaster',
                poster_agent_id: 0,
                content:
                  'Revisamos hoje as contas da tesouraria interna: os pomares, bambuzais e hortas do Jardim da Grande Vista serão confiados às zeladoras veteranas do próprio jardim, eliminando desperdícios de intermediários e economizando mais de 400 taéis por ano!'
              },
              {
                poster_type: 'StewardServant',
                poster_agent_id: 1,
                content:
                  'A Senhora Lian instruiu expressamente: a reforma da Terceira Senhorita visa promover benefícios e cortar abusos; a renda anual das zeladoras do jardim será revertida entre as próprias trabalhadoras, sem retenção na tesouraria!'
              }
            ]
          : [
              {
                poster_type: 'UniversityAdmin',
                poster_agent_id: 3,
                content:
                  '[Comunicado de Abertura do Campus] Nesta temporada das cerejeiras, ativamos oficialmente o "Agendamento Nominal por Horário + Sessão Noturna Pública (18:30-21:30)", com acesso por cartão nos prédios acadêmicos e laboratórios.'
              },
              {
                poster_type: 'CampusGroup',
                poster_agent_id: 0,
                content:
                  'Testei hoje pela manhã o controle de acesso nos prédios de Informática e Ciências e o efeito foi excelente! Sugiro apenas criar filas expressas para estudantes e professores nos refeitórios durante o horário de almoço.'
              }
            ]
    },
    twitter_config: {
      recency_weight: 0.45,
      popularity_weight: 0.35,
      relevance_weight: 0.2,
      viral_threshold: 15,
      echo_chamber_strength: 0.3
    },
    reddit_config: {
      recency_weight: 0.3,
      popularity_weight: 0.4,
      relevance_weight: 0.3,
      viral_threshold: 10,
      echo_chamber_strength: 0.25
    },
    generation_reasoning:
      'Definido ciclo de simulação de 24 horas (30 minutos por rodada) com base nas relações centrais do grafo de conhecimento e amostras históricas | Atribuídos horários ativos e tendências de sentimento diferenciados para estudantes, visitantes e mídia | Calibrados simultaneamente o peso de viralização instantânea na Praça (Twitter) e o peso de debate aprofundado na Comunidade (Reddit)',
    agent_configs: profiles.map((p, idx) => ({
      agent_id: idx,
      entity_name: p.username,
      entity_type: p.entity_type,
      stance: idx % 3 === 0 ? 'supportive' : idx % 3 === 1 ? 'neutral' : 'observer',
      active_hours: [8, 9, 10, 12, 13, 18, 19, 20, 21, 22],
      posts_per_hour: 1.5,
      comments_per_hour: 3.0,
      response_delay_min: 2,
      response_delay_max: 15,
      activity_level: Number((0.82 - idx * 0.05).toFixed(2)),
      sentiment_bias: Number((0.35 - idx * 0.1).toFixed(2)),
      influence_weight: Number((2.2 - idx * 0.15).toFixed(2))
    }))
  })

  const actionsBySim = {
    sim_whu2025: [
      {
        id: 'act_whu_1',
        round_num: 1,
        timestamp: '2026-11-06T08:05:12.000Z',
        platform: 'twitter',
        agent_id: 3,
        agent_name: 'Zhou Jianguo · Supervisor de Segurança do Campus',
        action_type: 'CREATE_POST',
        action_args: {
          content:
            '[Comunicado de Abertura do Campus] Nesta temporada das cerejeiras, ativamos oficialmente o "Agendamento Nominal por Horário + Sessão Noturna Pública (18:30-21:30)". Salas de aula, laboratórios e dormitórios contam com controle de acesso por cartão, e IPs suspeitos de cambistas foram bloqueados. Boa visita a todos!'
        }
      },
      {
        id: 'act_whu_2',
        round_num: 2,
        timestamp: '2026-11-06T08:10:25.000Z',
        platform: 'reddit',
        agent_id: 0,
        agent_name: 'Lin Zhiyuan · Doutorando em Computação',
        action_type: 'CREATE_POST',
        action_args: {
          content:
            'Testei hoje cedo a separação por cartão ao redor da Faculdade de Informática e do prédio de Ciências e o resultado foi ótimo! O barulho nos corredores dos laboratórios praticamente desapareceu. Sugiro que o setor de logística crie uma fila rápida exclusiva para alunos e professores nos refeitórios entre 11:40 e 12:20.'
        }
      },
      {
        id: 'act_whu_3',
        round_num: 3,
        timestamp: '2026-11-06T08:15:40.000Z',
        platform: 'twitter',
        agent_id: 2,
        agent_name: 'Chen Mo · Fotógrafo de Paisagem Urbana',
        action_type: 'QUOTE_POST',
        action_args: {
          original_post_content: 'Nesta temporada das cerejeiras, ativamos oficialmente o "Agendamento Nominal por Horário + Sessão Noturna Pública (18:30-21:30)"',
          content:
            'Parabéns pela nova sessão noturna pública das 18:30 às 21:30! Fotografei ontem os dormitórios históricos e o Castelo das Cerejeiras: a iluminação quente ficou elegante e discreta, e a entrada escalonada deixou as passarelas muito mais fluidas.'
        }
      },
      {
        id: 'act_whu_4',
        round_num: 4,
        timestamp: '2026-11-06T08:20:08.000Z',
        platform: 'reddit',
        agent_id: 1,
        agent_name: 'Su Qing · Voluntária Guia das Cerejeiras',
        action_type: 'CREATE_COMMENT',
        action_args: {
          post_id: 'act_whu_2',
          content:
            'Nossa equipe de voluntários montou 6 pontos gratuitos de explicação histórica na Praça Kunpeng e na Avenida das Cerejeiras, além de distribuir um mapa ilustrado de roteiros e gastronomia que direciona os visitantes para a feira cultural, aliviando os refeitórios estudantis!'
        }
      },
      {
        id: 'act_whu_5',
        round_num: 5,
        timestamp: '2026-11-06T08:24:51.000Z',
        platform: 'twitter',
        agent_id: 5,
        agent_name: 'Zhao Mingxuan · Ex-Aluno Turma de 2008',
        action_type: 'CREATE_POST',
        action_args: {
          content:
            'Entrada liberada em 30 segundos pelo canal verde do cartão digital de ex-aluno! Como ex-alunos, recomendamos aos colegas visitar o campus em tardes de dias úteis ou na sessão noturna, deixando mais vagas de fim de semana para visitantes de outras cidades.'
        }
      },
      {
        id: 'act_whu_6',
        round_num: 6,
        timestamp: '2026-11-06T08:29:15.000Z',
        platform: 'reddit',
        agent_id: 4,
        agent_name: 'He Yingxue · Editora do Observatório Superior',
        action_type: 'CREATE_POST',
        action_args: {
          content:
            '[Balanço de Opinião Pública] Em comparação ao dilema binário de anos anteriores entre "fechamento total" ou "superlotação desordenada", a combinação de agendamento por faixa, isolamento físico de prédios de ensino e ampliação noturna reduziu o sentimento negativo de 31% para 7,4% nas primeiras 48 horas.'
        }
      }
    ],
    sim_hlm1791: [
      {
        id: 'act_hlm_1',
        round_num: 1,
        timestamp: '2026-11-05T14:25:00.000Z',
        platform: 'reddit',
        agent_id: 0,
        agent_name: 'Jia Tanchun · Senhora do Estúdio de Outono',
        action_type: 'CREATE_POST',
        action_args: {
          content:
            'Conferimos hoje no salão de conselho as despesas da tesouraria: em vez de gastar prata todos os anos contratando intermediários externos para podar as plantas, bambuzais e hortas do Jardim da Grande Vista, entregaremos o cuidado por contrato às zeladoras veteranas do próprio jardim, economizando mais de 400 taéis anuais!'
        }
      },
      {
        id: 'act_hlm_2',
        round_num: 2,
        timestamp: '2026-11-05T14:32:00.000Z',
        platform: 'twitter',
        agent_id: 1,
        agent_name: 'Ping\'er · Fiel Escudeira da Senhora Lian',
        action_type: 'CREATE_POST',
        action_args: {
          content:
            'Recado expresso da Senhora Lian: a Terceira Senhorita, junto à Senhora Li e à Senhorita Bao, está eliminando desperdícios antigos; todas as verbas duplicadas de cosméticos serão revisadas, e os excedentes do jardim ficarão integralmente com as zeladoras no fim do ano!'
        }
      },
      {
        id: 'act_hlm_3',
        round_num: 3,
        timestamp: '2026-11-05T14:40:00.000Z',
        platform: 'reddit',
        agent_id: 2,
        agent_name: 'Mãe Zhu · Zeladora dos Bambuzais de Xiaoxiang',
        action_type: 'CREATE_COMMENT',
        action_args: {
          post_id: 'act_hlm_1',
          content:
            'A Terceira Senhorita e as senhoras realmente olham por nós que trabalhamos duro! Confiando o bambuzal aos meus cuidados, nenhuma vara de bambu ou broto será desperdiçado e deixaremos o Pavilhão Xiaoxiang ainda mais viçoso!'
        }
      }
    ]
  }

  const simulations = {
    sim_whu2025: {
      simulation_id: 'sim_whu2025',
      project_id: 'proj_whu2025',
      graph_id: 'graph_whu2025',
      report_id: 'report_whu2025',
      status: 'completed',
      enable_twitter: true,
      enable_reddit: true,
      current_round: 12,
      total_rounds: 12,
      created_at: now
    },
    sim_hlm1791: {
      simulation_id: 'sim_hlm1791',
      project_id: 'proj_hlm1791',
      graph_id: 'graph_hlm1791',
      report_id: 'report_hlm1791',
      status: 'completed',
      enable_twitter: true,
      enable_reddit: true,
      current_round: 10,
      total_rounds: 10,
      created_at: earlier
    }
  }

  const buildReportEntry = (reportId, simId, title, summary, sections) => {
    const markdownContent = [
      `# ${title}`,
      '',
      `> ${summary}`,
      '',
      ...sections.map((s) => `## ${s.title}\n\n${s.content}`)
    ].join('\n\n')

    const outline = {
      title,
      summary,
      sections: sections.map((s) => ({
        title: s.title,
        description: s.description
      }))
    }

    const logs = [
      {
        timestamp: '2026-11-06T08:31:00.000Z',
        elapsed_seconds: 0.4,
        report_id: reportId,
        action: 'report_start',
        stage: 'init',
        details: { simulation_id: simId }
      },
      {
        timestamp: '2026-11-06T08:31:02.000Z',
        elapsed_seconds: 2.1,
        report_id: reportId,
        action: 'planning_start',
        stage: 'planning',
        details: { message: 'Planejando a estrutura do relatório com base nas entidades do grafo e na trajetória da simulação' }
      },
      {
        timestamp: '2026-11-06T08:31:05.000Z',
        elapsed_seconds: 5.0,
        report_id: reportId,
        action: 'planning_complete',
        stage: 'planning',
        details: { outline }
      }
    ]

    sections.forEach((sec, idx) => {
      const sectionIndex = idx + 1
      logs.push(
        {
          timestamp: `2026-11-06T08:31:${String(10 + idx * 10).padStart(2, '0')}.000Z`,
          elapsed_seconds: 10 + idx * 10,
          report_id: reportId,
          action: 'section_start',
          stage: 'generating',
          section_index: sectionIndex,
          section_title: sec.title,
          details: { description: sec.description }
        },
        {
          timestamp: `2026-11-06T08:31:${String(13 + idx * 10).padStart(2, '0')}.000Z`,
          elapsed_seconds: 13 + idx * 10,
          report_id: reportId,
          action: 'tool_call',
          stage: 'generating',
          section_index: sectionIndex,
          section_title: sec.title,
          details: {
            tool_name: idx === 0 ? 'panorama_search' : idx === 1 ? 'insight_forge' : 'interview_agents',
            parameters: { query: sec.title }
          }
        },
        {
          timestamp: `2026-11-06T08:31:${String(16 + idx * 10).padStart(2, '0')}.000Z`,
          elapsed_seconds: 16 + idx * 10,
          report_id: reportId,
          action: 'tool_result',
          stage: 'generating',
          section_index: sectionIndex,
          section_title: sec.title,
          details: {
            tool_name: idx === 0 ? 'panorama_search' : idx === 1 ? 'insight_forge' : 'interview_agents',
            result: sec.toolSummary
          }
        },
        {
          timestamp: `2026-11-06T08:31:${String(19 + idx * 10).padStart(2, '0')}.000Z`,
          elapsed_seconds: 19 + idx * 10,
          report_id: reportId,
          action: 'section_complete',
          stage: 'generating',
          section_index: sectionIndex,
          section_title: sec.title,
          details: {
            content: `## ${sec.title}\n\n${sec.content}`
          }
        }
      )
    })

    logs.push({
      timestamp: '2026-11-06T08:31:55.000Z',
      elapsed_seconds: 55.0,
      report_id: reportId,
      action: 'report_complete',
      stage: 'completed',
      details: { total_sections: sections.length }
    })

    const consoleLogs = [
      `[08:31:00] INFO: ReportAgent inicializado com sucesso (report_id=${reportId}, simulation_id=${simId})`,
      `[08:31:02] INFO: Recuperando nós de entidade do GraphRAG e trajetórias das duas plataformas...`,
      `[08:31:05] INFO: Estrutura do relatório gerada com ${sections.length} seções principais`,
      ...sections.map(
        (s, i) => `[08:31:${15 + i * 10}] INFO: Seção [${i + 1}/${sections.length}] "${s.title}" verificada e redigida`
      ),
      `[08:31:55] INFO: Relatório de análise preditiva da simulação concluído!`
    ]

    return {
      report: {
        report_id: reportId,
        simulation_id: simId,
        status: 'completed',
        outline,
        markdown_content: markdownContent,
        created_at: now,
        completed_at: now
      },
      logs,
      consoleLogs,
      sections: sections.map((s, idx) => ({
        filename: `section_0${idx + 1}.md`,
        section_index: idx + 1,
        content: `## ${s.title}\n\n${s.content}`
      }))
    }
  }

  const whuReport = buildReportEntry(
    'report_whu2025',
    'sim_whu2025',
    'Relatório de Avaliação da Evolução da Opinião Pública e Governança na Temporada das Cerejeiras da Universidade de Wuhan',
    'Com base em 12 rodadas de simulação multiagente em duas plataformas, reconstrói a curva de propagação da política de "Agendamento por Faixa + Canal Verde para Ex-Alunos + Sessão Noturna Pública" e apresenta recomendações de governança.',
    [
      {
        title: '1. Panorama da Evolução da Opinião Pública e Pontos de Inflexão',
        description: 'Reconstitui as mudanças de temperatura e polaridade emocional nas três fases desde o anúncio até a operação estável',
        toolSummary: 'Recuperados 8 nós centrais do grafo, 9 cadeias de relação e 6 interações de alto engajamento nas duas plataformas.',
        content:
          'Os dados da simulação demonstram que nas primeiras 4 rodadas (0 a 2 horas) após o anúncio da política, a opinião pública concentrou-se na **taxa de aprovação no sorteio** e no **risco de cambistas**; a partir da 5ª rodada, com o bloqueio de IPs anômalos pela equipe de segurança e a separação por cartão magnético nos prédios acadêmicos, o índice de satisfação interna subiu para **89,2%**.\n\n- **Primeira Fase (Exame das Regras)**: Visitantes externos demonstraram forte interesse no horário da sessão noturna (18:30-21:30) e no fluxo de validação nas catracas.\n- **Segunda Fase (Validação de Experiência)**: Relatos práticos de doutorandos e fotógrafos serviram como âncoras de confiança, impulsionando o boca a boca positivo.\n- **Terceira Fase (Convergência de Consenso)**: A orientação dos voluntários e o apelo dos ex-alunos por visitas fora de pico criaram um ciclo virtuoso de autorregulação comunitária.'
      },
      {
        title: '2. Diferenciação de Posturas e Dinâmica entre Múltiplos Atores',
        description: 'Analisa as divergências e pontos de convergência entre docentes/discentes, turistas, ex-alunos e mídia educacional',
        toolSummary: 'A análise InsightForge extraiu 3 eixos centrais de tensão e 4 consensos intergrupais.',
        content:
          'Os diferentes grupos apresentaram estruturas distintas de debate na Praça (Twitter) e na Comunidade (Reddit):\n\n1. **Corpo Docente e Discente (Lin Zhiyuan e outros)**: A linha inegociável é o **silêncio nos prédios de aula e laboratórios e a fluidez nos refeitórios**. O isolamento físico por cartão aliado a filas expressas dissipou rapidamente a resistência inicial.\n2. **Público Geral e Fotógrafos (Chen Mo e outros)**: Avaliaram de forma extremamente positiva a estética da sessão noturna, concentrando suas demandas no combate a cambistas e na transparência das vagas remanescentes.\n3. **Comunidade de Ex-Alunos (Zhao Mingxuan e outros)**: O canal digital isento de sorteio fortaleceu o sentimento de pertencimento, levando o grupo a promover espontaneamente a visitação em horários alternativos.'
      },
      {
        title: '3. Alertas de Risco e Recomendações de Otimização de Governança',
        description: 'Propõe soluções práticas para o pico de almoço, reagendamento em dias de chuva e sinalização noturna',
        toolSummary: 'Sintetizadas 3 recomendações prioritárias de gestão a partir de entrevistas com 6 Agentes representativos.',
        content:
          'Com base nos pontos de atrito locais identificados durante a simulação, recomenda-se à administração universitária adotar três otimizações ágeis:\n\n- **Escalonamento Elástico nos Refeitórios**: No horário de pico das 11:30 às 12:30, reservar o térreo dos refeitórios para pagamento via cartão estudantil e instalar food trucks e quiosques culturais ao redor da Praça Kunpeng.\n- **Pool Automático de Reaplicação de Desistências**: Instituir cancelamento gratuito até 6 horas antes da visita, realocando automaticamente as vagas liberadas para a fila de espera da sessão noturna.\n- **Protocolo Climático de Contingência**: Em caso de chuva forte ou queda brusca de temperatura, prorrogar automaticamente por até 7 dias a validade do agendamento adquirido, evitando ondas concentradas de cancelamento.'
      }
    ]
  )

  const hlmReport = buildReportEntry(
    'report_hlm1791',
    'sim_hlm1791',
    'Relatório de Simulação: Reforma do Jardim da Grande Vista e Opinião Interna na Mansão Rongguo',
    'Em torno da reforma de responsabilidade contratual de Jia Tanchun, simula a reestruturação de interesses e a pacificação de rumores entre os senhores, criadas-chefes e governantas.',
    [
      {
        title: '1. Desenho Institucional e Desempenho Fiscal da Reforma de Tanchun',
        description: 'Avalia quantitativamente o efeito de economia do arrendamento de bambuzais e pomares e do corte de gastos duplicados',
        toolSummary: 'Recuperados 5 nós centrais de personagens e políticas, com economia anual estimada acima de 400 taéis de prata.',
        content:
          'O **Sistema de Responsabilidade Contratual do Jardim da Grande Vista**, implementado por Jia Tanchun em conjunto com Li Wan e Xue Baochai, confiou o cuidado dos bambuzais de Xiaoxiang, das ervas aromáticas de Hengwu e das hortas de Daoxiang a zeladoras dedicadas como Mãe Zhu e Mãe Tian, eliminando de vez o superfaturamento das antigas encarregadas de compras.\n\n- **Efeito Direto de Economia**: Ao dispensar intermediários externos e cortar verbas duplicadas de cosméticos e óleos, a tesouraria economiza mais de 400 taéis de prata por ano.\n- **Reestruturação de Incentivos**: As zeladoras passam a ter direito sobre os lucros excedentes no fim do ano, transformando a vigilância passiva em cuidado produtivo espontâneo.'
      },
      {
        title: '2. Propagação de Rumores entre Governantas e o Amortecimento de Ping\'er',
        description: 'Analisa como os boatos de resistência das antigas compradoras foram neutralizados pela estratégia de autoridade e benevolência',
        toolSummary: 'Comparada a divergência de atitudes entre as compradoras da tesouraria e as zeladoras residentes no jardim.',
        content:
          'No início da reforma, as encarregadas de compras que perderam comissões paralelas tentaram espalhar o boato de que a administração estava "oprimindo os servos". **Ping\'er**, respaldada pela autoridade de Wang Xifeng, adotou a diretriz de não recolher os lucros do jardim ao cofre central e distribuir os dividendos entre as trabalhadoras, conquistando apoio amplamente majoritário já na 3ª rodada da simulação.'
      }
    ]
  )

  return {
    projects,
    graphs,
    profilesBySim,
    configsBySim: {
      sim_whu2025: buildConfigForSim('sim_whu2025', profilesBySim.sim_whu2025),
      sim_hlm1791: buildConfigForSim('sim_hlm1791', profilesBySim.sim_hlm1791)
    },
    actionsBySim,
    simulations,
    reports: {
      report_whu2025: whuReport,
      report_hlm1791: hlmReport
    },
    tasks: {
      task_build_whu2025: {
        task_id: 'task_build_whu2025',
        status: 'completed',
        progress: 100,
        message: 'Construção do grafo concluída',
        result: { project_id: 'proj_whu2025', graph_id: 'graph_whu2025', node_count: 8, edge_count: 9 }
      },
      task_build_hlm1791: {
        task_id: 'task_build_hlm1791',
        status: 'completed',
        progress: 100,
        message: 'Construção do grafo concluída',
        result: { project_id: 'proj_hlm1791', graph_id: 'graph_hlm1791', node_count: 5, edge_count: 5 }
      }
    }
  }
}

export class MiroFishStore {
  constructor() {
    this.state = createInitialSeedData()
    this.counter = 100
  }

  nextId(prefix) {
    this.counter += 1
    return `${prefix}_${Date.now().toString(36)}${this.counter}`
  }

  getHistory(limit = 20) {
    const sims = Object.values(this.state.simulations)
    return sims.slice(0, limit).map((sim) => {
      const proj = this.state.projects[sim.project_id] || {}
      return {
        simulation_id: sim.simulation_id,
        project_id: sim.project_id,
        graph_id: sim.graph_id || proj.graph_id,
        report_id: sim.report_id,
        status: sim.status,
        simulation_requirement: proj.simulation_requirement || 'Análise de simulação de opinião pública',
        files: proj.files || [],
        current_round: sim.current_round ?? 12,
        total_rounds: sim.total_rounds ?? 12,
        created_at: sim.created_at || proj.created_at
      }
    })
  }

  getProject(projectId) {
    return this.state.projects[projectId] || null
  }

  listProjects(limit = 50) {
    return Object.values(this.state.projects).slice(0, limit)
  }

  generateOntology({ simulationRequirement, projectName, files }) {
    if (!simulationRequirement || !String(simulationRequirement).trim()) {
      throw new Error('Por favor, forneça a descrição do requisito de simulação (simulation_requirement is required)')
    }
    const cleanReq = String(simulationRequirement).trim()
    const projectId = this.nextId('proj')
    const graphId = this.nextId('graph')
    const taskId = this.nextId('task')
    const now = new Date().toISOString()

    const normalizedFiles =
      Array.isArray(files) && files.length > 0
        ? files.map((f) => ({
            filename: f.filename || f.name || 'documento.md',
            size: f.size || 12800
          }))
        : [{ filename: 'semente_contexto.md', size: 16384 }]

    const ontology = {
      entity_types: [
        {
          name: 'KeyStakeholder',
          description: 'Partes interessadas centrais e tomadores de decisão do evento',
          attributes: [
            { name: 'role', type: 'string', description: 'Papel institucional do ator' },
            { name: 'influence', type: 'string', description: 'Nível de influência comunicacional' }
          ],
          examples: ['Órgão Emissor da Política', 'Instituição Executora', 'Representante Setorial']
        },
        {
          name: 'PublicCommunity',
          description: 'Grupos públicos participantes do debate e usuários de comunidades temáticas',
          attributes: [{ name: 'sentiment_tendency', type: 'string', description: 'Tendência emocional inicial' }],
          examples: ['Público Diretamente Impactado', 'Observadores Racionais', 'Usuários de Linha de Frente']
        },
        {
          name: 'OpinionLeader',
          description: 'Veículos de mídia e formadores de opinião com capacidade de definir a agenda',
          attributes: [{ name: 'platform', type: 'string', description: 'Plataforma principal de atuação' }],
          examples: ['Coluna de Análise Profunda', 'Criador de Testes de Campo']
        }
      ],
      edge_types: [
        {
          name: 'RESPONDS_TO',
          description: 'Comunidades públicas ou líderes de opinião respondem e se posicionam sobre o tema central',
          attributes: [{ name: 'stance', type: 'string', description: 'Postura de resposta' }],
          source_targets: [{ source: 'PublicCommunity', target: 'KeyStakeholder' }]
        },
        {
          name: 'AMPLIFIES',
          description: 'Formadores de opinião amplificam perspectivas comunitárias e geram propagação secundária',
          attributes: [],
          source_targets: [{ source: 'OpinionLeader', target: 'PublicCommunity' }]
        }
      ]
    }

    const project = {
      project_id: projectId,
      name: projectName || cleanReq.slice(0, 24),
      status: 'graph_completed',
      simulation_requirement: cleanReq,
      graph_id: graphId,
      graph_build_task_id: taskId,
      ontology,
      analysis_summary: `Análise documental multifonte e modelagem ontológica concluídas para "${cleanReq.slice(0, 50)}", identificando 3 classes de entidades centrais e 2 tipos de relação de propagação.`,
      files: normalizedFiles,
      total_text_length: 19600,
      chunk_size: 500,
      chunk_overlap: 50,
      created_at: now
    }

    this.state.projects[projectId] = project
    this.state.graphs[graphId] = {
      graph_id: graphId,
      node_count: 6,
      edge_count: 6,
      nodes: [
        {
          uuid: `${graphId}_n1`,
          name: 'Emissor Central da Pauta',
          labels: ['Entity', 'KeyStakeholder'],
          summary: `Lidera a publicação de diretrizes e respostas institucionais sobre "${cleanReq.slice(0, 30)}".`,
          attributes: { role: 'Tomador de Decisão', influence: 'Alta' },
          created_at: now
        },
        {
          uuid: `${graphId}_n2`,
          name: 'Grupo Diretamente Impactado',
          labels: ['Entity', 'PublicCommunity'],
          summary: 'Participantes centrais que vivenciam diretamente os efeitos práticos da medida ou evento.',
          attributes: { sentiment_tendency: 'Expectativa Cautelosa' },
          created_at: now
        },
        {
          uuid: `${graphId}_n3`,
          name: 'Mídia Especializada de Análise',
          labels: ['Entity', 'OpinionLeader'],
          summary: 'Veículo que fornece detalhamento de dados e cobertura equilibrada sob múltiplos ângulos.',
          attributes: { platform: 'Atuação nas Duas Plataformas' },
          created_at: now
        },
        {
          uuid: `${graphId}_n4`,
          name: 'Comunidade Geral de Debate Social',
          labels: ['Entity', 'PublicCommunity'],
          summary: 'Usuários ativos que interagem em alta frequência sobre os tópicos em alta na Praça e na Comunidade.',
          attributes: { sentiment_tendency: 'Plural e Diversificada' },
          created_at: now
        },
        {
          uuid: `${graphId}_n5`,
          name: 'Criador Independente de Testes Práticos',
          labels: ['Entity', 'OpinionLeader'],
          summary: 'Influenciador que orienta a percepção pública por meio de relatos presenciais e verificações em campo.',
          attributes: { platform: 'Foco na Praça' },
          created_at: now
        },
        {
          uuid: `${graphId}_n6`,
          name: 'Equipe de Governança e Operação',
          labels: ['Entity', 'KeyStakeholder'],
          summary: 'Equipe operacional responsável pelo suporte de serviços, coleta de feedback e ajustes finos.',
          attributes: { role: 'Execução Operacional', influence: 'Média-Alta' },
          created_at: now
        }
      ],
      edges: [
        {
          uuid: `${graphId}_e1`,
          source_node_uuid: `${graphId}_n2`,
          target_node_uuid: `${graphId}_n1`,
          name: 'RESPONDS_TO',
          fact_type: 'RESPONDS_TO',
          fact: 'O grupo diretamente impactado apresenta sugestões construtivas de aprimoramento sobre os detalhes operacionais.',
          episodes: ['ep_init_1'],
          created_at: now,
          valid_at: now
        },
        {
          uuid: `${graphId}_e2`,
          source_node_uuid: `${graphId}_n3`,
          target_node_uuid: `${graphId}_n2`,
          name: 'AMPLIFIES',
          fact_type: 'AMPLIFIES',
          fact: 'A mídia especializada sistematiza as demandas da linha de frente e publica reportagem analítica.',
          episodes: ['ep_init_2'],
          created_at: now,
          valid_at: now
        },
        {
          uuid: `${graphId}_e3`,
          source_node_uuid: `${graphId}_n5`,
          target_node_uuid: `${graphId}_n4`,
          name: 'AMPLIFIES',
          fact_type: 'AMPLIFIES',
          fact: 'O criador de testes práticos divulga relato em primeira mão, reduzindo significativamente a ansiedade do público.',
          episodes: ['ep_init_3'],
          created_at: now,
          valid_at: now
        },
        {
          uuid: `${graphId}_e4`,
          source_node_uuid: `${graphId}_n6`,
          target_node_uuid: `${graphId}_n2`,
          name: 'RESPONDS_TO',
          fact_type: 'RESPONDS_TO',
          fact: 'A equipe operacional responde rapidamente ao feedback inicial e anuncia medidas complementares de melhoria.',
          episodes: ['ep_init_4'],
          created_at: now,
          valid_at: now
        },
        {
          uuid: `${graphId}_e5`,
          source_node_uuid: `${graphId}_n4`,
          target_node_uuid: `${graphId}_n1`,
          name: 'RESPONDS_TO',
          fact_type: 'RESPONDS_TO',
          fact: 'O foco do debate público migra das controvérsias iniciais sobre regras para a experiência prática dos serviços.',
          episodes: ['ep_init_5'],
          created_at: now,
          valid_at: now
        },
        {
          uuid: `${graphId}_e6`,
          source_node_uuid: `${graphId}_n3`,
          target_node_uuid: `${graphId}_n6`,
          name: 'AMPLIFIES',
          fact_type: 'AMPLIFIES',
          fact: 'A mídia destaca o efeito positivo do mecanismo de resposta ágil na estabilização da opinião pública.',
          episodes: ['ep_init_6'],
          created_at: now,
          valid_at: now
        }
      ]
    }

    this.state.tasks[taskId] = {
      task_id: taskId,
      status: 'completed',
      progress: 100,
      message: 'Construção do grafo concluída',
      result: {
        project_id: projectId,
        graph_id: graphId,
        node_count: 6,
        edge_count: 6
      }
    }

    return project
  }

  buildGraph({ project_id }) {
    const project = this.state.projects[project_id]
    if (!project) {
      throw new Error(`Projeto não encontrado: ${project_id}`)
    }
    project.status = 'graph_completed'
    return {
      project_id: project.project_id,
      task_id: project.graph_build_task_id,
      graph_id: project.graph_id,
      reused: true,
      message: 'Construção do grafo concluída'
    }
  }

  getGraphData(graphId) {
    return this.state.graphs[graphId] || this.state.graphs.graph_whu2025
  }

  createSimulation({ project_id, graph_id, enable_twitter = true, enable_reddit = true }) {
    const existing = Object.values(this.state.simulations).find((s) => s.project_id === project_id)
    if (existing) {
      return existing
    }
    const simId = this.nextId('sim')
    const reportId = this.nextId('report')
    const project = this.state.projects[project_id] || this.state.projects.proj_whu2025
    const profiles = [...this.state.profilesBySim.sim_whu2025]
    this.state.profilesBySim[simId] = profiles
    this.state.configsBySim[simId] = {
      ...this.state.configsBySim.sim_whu2025,
      simulation_id: simId
    }
    this.state.actionsBySim[simId] = [...this.state.actionsBySim.sim_whu2025]

    const sim = {
      simulation_id: simId,
      project_id: project.project_id,
      graph_id: graph_id || project.graph_id,
      report_id: reportId,
      status: 'completed',
      enable_twitter,
      enable_reddit,
      current_round: 12,
      total_rounds: 12,
      created_at: new Date().toISOString()
    }
    this.state.simulations[simId] = sim

    // Seed report for newly created simulation
    const baseReport = this.state.reports.report_whu2025
    this.state.reports[reportId] = {
      report: {
        ...baseReport.report,
        report_id: reportId,
        simulation_id: simId,
        outline: {
          ...baseReport.report.outline,
          title: `${project.name} - Relatório de Evolução da Opinião Pública`
        }
      },
      logs: baseReport.logs.map((l) => ({ ...l, report_id: reportId })),
      consoleLogs: [...baseReport.consoleLogs],
      sections: [...baseReport.sections]
    }

    return sim
  }

  getSimulation(simulationId) {
    return this.state.simulations[simulationId] || this.state.simulations.sim_whu2025
  }

  getProfiles(simulationId) {
    return this.state.profilesBySim[simulationId] || this.state.profilesBySim.sim_whu2025
  }

  getConfig(simulationId) {
    return this.state.configsBySim[simulationId] || this.state.configsBySim.sim_whu2025
  }

  getActions(simulationId) {
    return this.state.actionsBySim[simulationId] || this.state.actionsBySim.sim_whu2025
  }

  getRunStatus(simulationId) {
    const sim = this.getSimulation(simulationId)
    const actions = this.getActions(simulationId)
    const twitterActions = actions.filter((a) => a.platform === 'twitter').length
    const redditActions = actions.filter((a) => a.platform === 'reddit').length
    const totalRounds = sim.total_rounds || 12
    const currentRound = sim.current_round || totalRounds

    return {
      simulation_id: sim.simulation_id,
      runner_status: 'completed',
      current_round: currentRound,
      total_rounds: totalRounds,
      twitter_current_round: currentRound,
      reddit_current_round: currentRound,
      twitter_simulated_hours: Math.round((currentRound * 30) / 60),
      reddit_simulated_hours: Math.round((currentRound * 30) / 60),
      twitter_actions_count: twitterActions,
      reddit_actions_count: redditActions,
      twitter_running: false,
      reddit_running: false,
      twitter_completed: true,
      reddit_completed: true,
      process_pid: 4821
    }
  }

  getReportEntry(reportId) {
    return this.state.reports[reportId] || this.state.reports.report_whu2025
  }

  getReportBySimulation(simulationId) {
    const sim = this.getSimulation(simulationId)
    if (sim && sim.report_id && this.state.reports[sim.report_id]) {
      return this.state.reports[sim.report_id]
    }
    return this.state.reports.report_whu2025
  }

  chatWithReportAgent({ simulation_id, message }) {
    if (!message || !String(message).trim()) {
      throw new Error('O conteúdo da mensagem não pode estar vazio (message is required)')
    }
    const sim = this.getSimulation(simulation_id)
    const proj = this.state.projects[sim.project_id] || this.state.projects.proj_whu2025
    const profiles = this.getProfiles(sim.simulation_id)
    const cleanMsg = String(message).trim()

    return {
      response: `Com base no grafo de conhecimento de **${proj.name}** e na trajetória de ${sim.total_rounds} rodadas nas duas plataformas, segue a análise sobre "${cleanMsg}":\n\n1. **Tendência Central da Opinião Pública**: Nas primeiras 4 rodadas da simulação, o debate girou em torno da equidade das regras e dos limites operacionais; com a entrada de relatos práticos (como **${profiles[0]?.username || 'Representante Acadêmico'}** e **${profiles[1]?.username || 'Representante Voluntária'}**), o consenso comunitário convergiu rapidamente.\n2. **Dinâmica Entre Plataformas**: A Praça (Twitter) concentrou o compartilhamento visual e reações imediatas, enquanto a Comunidade (Reddit) aprofundou propostas práticas (como filas escalonadas e realocação de vagas).\n3. **Recomendação de Decisão**: Manter a transparência dos indicadores de operação em tempo real e adotar medidas elásticas de atendimento nos horários de pico.`,
      tool_calls: [
        {
          tool_name: 'insight_forge',
          parameters: { query: cleanMsg }
        }
      ],
      sources: [
        { type: 'graph_entity', name: proj.name },
        { type: 'simulation_trace', simulation_id: sim.simulation_id }
      ]
    }
  }

  interviewAgents({ simulation_id, interviews = [] }) {
    const profiles = this.getProfiles(simulation_id)
    const results = {}

    interviews.forEach((item) => {
      const agentId = Number(item.agent_id ?? 0)
      const prompt = String(item.prompt || '').trim()
      const agent = profiles[agentId] || profiles[0]
      const reply = `[${agent.username} (${agent.profession})] em resposta a "${prompt.slice(0, 60)}":\nSob a perspectiva do meu grupo (**${agent.entity_type}**), o ponto essencial é equilibrar a transparência na aplicação das regras com a experiência cotidiana de quem está no local. Desde que os temas prioritários (${(agent.interested_topics || []).join(', ')}) continuem recebendo ajustes dinâmicos, mantenho uma avaliação positiva sobre os próximos desdobramentos.`

      results[`reddit_${agentId}`] = {
        agent_id: agentId,
        agent_name: agent.username,
        platform: 'reddit',
        response: reply,
        answer: reply
      }
      results[`twitter_${agentId}`] = {
        agent_id: agentId,
        agent_name: agent.username,
        platform: 'twitter',
        response: reply,
        answer: reply
      }
    })

    return {
      result: {
        total_interviews: interviews.length,
        results
      }
    }
  }
}

export const defaultStore = new MiroFishStore()
