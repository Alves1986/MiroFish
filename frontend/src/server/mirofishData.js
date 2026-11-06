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

  const buildConfigForSim = (simId, profiles, eventConfigOverride = null, reasoningOverride = null) => ({
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
    event_config: eventConfigOverride || {
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
      reasoningOverride ||
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
    return formatSimulationReport(reportId, simId, title, summary, sections)
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
    },
    contextualArtifactsByProject: {}
  }
}

function generatePanoramaToolResult(title, summary, content) {
  return [
    '## 广度搜索结果（未来全景视图）',
    `查询: ${title}`,
    '',
    '### 统计信息',
    '- 总节点数: 8',
    '- 总边数: 12',
    '- 当前有效事实: 5条',
    '- 历史/过期事实: 3条',
    '',
    '### 【当前有效事实】(模拟结果原文)',
    '1. "Coleta de métricas e trajetórias de alta consistência observadas nas duas plataformas (Twitter/Reddit)."',
    `2. "${summary ? summary.slice(0, 150) : 'Resumo das interações e dinâmica da simulação.'}"`,
    '3. "Estabilidade de execução e previsibilidade nas respostas dos agentes simulados."',
    '4. "Consenso amplo entre grupos de usuários com mitigação de divergências iniciais."',
    '5. "Rastreabilidade completa de trocas nas duas plataformas técnicas."',
    '',
    '### 【历史/过期事实】(演变过程记录)',
    '1. "[0-2h] Dúvidas iniciais sobre configuração de infraestrutura e parâmetros de prioridade."',
    '2. "[2-4h] Ajustes de regras de acesso e validação de permissões."',
    '3. "[4-6h] Estabilização dos canais digitais de comunicação."',
    '',
    '### 【涉及实体】',
    '- **Engenharia de Sistemas** (Tecnologia)',
    '- **Comunidade de Usuários** (Governança)',
    '- **Plataforma Twitter & Reddit** (Canal)',
    '- **Gestão de Infraestrutura** (Organização)'
  ].join('\n')
}

function generateInsightForgeToolResult(title, description, content) {
  return [
    '## 未来预测深度分析',
    `分析问题: ${title}`,
    `预测场景: ${description || title}`,
    '',
    '### 预测数据统计',
    '- 相关预测事实: 6条',
    '- 涉及实体: 4个',
    '- 关系链: 5条',
    '',
    '### 分析的子问题',
    `1. Quais são as principais métricas e gargalos operacionais no contexto de "${title}"?`,
    `2. Como a satisfação dos agentes evolui entre a Praça (Twitter) e a Comunidade (Reddit)?`,
    `3. Quais recomendações prioritárias surgem da análise preditiva?`,
    '',
    '### 【关键事实】(请在报告中引用这些原文)',
    '1. "Impacto positivo verificado com redução de atrito e ganho substancial em eficiência operacional."',
    '2. "Relatos práticos dos agentes representativos atuam como âncoras de confiança na rede."',
    '3. "Divergências de opinião foram neutralizadas pela transparência nas diretrizes adotadas."',
    '4. "Alto índice de concordância técnica na comunidade e engajamento equilibrado."',
    '5. "Adoção gradual com forte suporte do grupo de usuários chave."',
    '6. "Garantia de conformidade e previsibilidade de custos."',
    '',
    '### 【核心实体】',
    '- **Desempenho Técnico** (Métrica)',
    '  摘要: "Avaliação empírica com taxas elevadas de rendimento e estabilidade."',
    '  相关事实: 4条',
    '- **Comunidade de Agentes** (Grupo)',
    '  摘要: "Engajamento contínuo com feedback construtivo em ambas as plataformas."',
    '  相关事实: 3条',
    '- **Governança de Espaço Digital** (Política)',
    '  摘要: "Conjunto de regras para mediação e equilíbrio de demandas."',
    '  相关事实: 3条',
    '- **Plataforma Integrada** (Infraestrutura)',
    '  摘要: "Ambiente multiagente em duas plataformas para simulação real de opinião pública."',
    '  相关事实: 2条',
    '',
    '### 【关系链】',
    '- Desempenho Técnico --[impacta]--> Comunidade de Agentes',
    '- Governança de Espaço Digital --[sustenta]--> Plataforma Integrada',
    '- Comunidade de Agentes --[promove]--> Adoção de Soluções',
    '- Plataforma Integrada --[gera]--> Evidências Empíricas',
    '- Desempenho Técnico --[otimiza]--> Governança de Espaço Digital'
  ].join('\n')
}

function generateInterviewToolResult(title, description, content) {
  return [
    '## 深度采访报告',
    `**采访主题:** ${title}`,
    '**采访人数:** 3 / 6 位模拟Agent',
    '',
    '### 采访对象选择理由',
    '1. **Especialista Técnico（index=0）**：Selecionado por representar a visão técnica, operacional e métricas empíricas.',
    '2. **Avaliador de Governança（index=1）**：Selecionado por articular as demandas de governança, experiência e satisfação dos usuários.',
    '3. **Representante Comunitário（index=2）**：Selecionado para avaliar a aceitação social e a disseminação de informações.',
    '',
    '---',
    '',
    '### 采访实录',
    '',
    '#### 采访 #1: Especialista Técnico',
    '**Especialista Técnico** (Líder de Sistemas)',
    '_简介: Profissional responsável por métricas empíricas, estabilidade de infraestrutura e desempenho._',
    '',
    '**Q:** 1. Quais foram as principais impressões sobre a estabilidade do sistema e execução das tarefas?',
    '2. Qual a recomendação prioritária para manter o alinhamento positivo entre as partes?',
    '',
    '**A:** ',
    '【Twitter平台回答】',
    `No Twitter, a resposta imediata destacou a agilidade e a transparência. As métricas relativas a "${title.slice(0, 40)}" mostraram estabilidade acima da média esperada.`,
    '',
    '【Reddit平台回答】',
    `No Reddit, a comunidade realizou análises mais detalhadas sobre os parâmetros e diretrizes. Houve consenso de que a abordagem atual atende às necessidades técnicas e de governança.`,
    '',
    '**关键引言:**',
    '> "A estabilidade observada nas duas plataformas confirma a viabilidade técnica da solução."',
    '> "O engajamento espontâneo dos usuários fortaleceu a confiança nos resultados."',
    '',
    '---',
    '',
    '#### 采访 #2: Avaliador de Governança',
    '**Avaliador de Governança** (Gestão Pública)',
    '_简介: Responsável pela mediação de interesses e desenho de regras institucionais._',
    '',
    '**Q:** 1. Como a comunidade reagiu às diretrizes propostas durante a simulação?',
    '',
    '**A:** ',
    '【Twitter平台回答】',
    'No Twitter, os comentários principais focaram na previsibilidade das regras e no atendimento ao público.',
    '',
    '【Reddit平台回答】',
    'No Reddit, destacou-se a importância da transparência nos processos e da distribuição equitativa de recursos.',
    '',
    '**关键引言:**',
    '> "A clareza das regras reduziu drasticamente os ruídos de informação nas primeiras rodadas."',
    '',
    '---',
    '',
    '### 采访摘要与核心观点',
    `Sintetizadas as perspectivas dos 3 agentes representativos entrevistados sobre "${title}". Observa-se forte convergência em torno da eficácia das diretrizes e estabilidade das operações nas duas plataformas.`
  ].join('\n')
}

export function formatSimulationReport(reportId, simId, title, summary, sections) {
  const now = new Date().toISOString()
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
      timestamp: now,
      elapsed_seconds: 0.4,
      report_id: reportId,
      action: 'report_start',
      stage: 'init',
      details: { simulation_id: simId }
    },
    {
      timestamp: now,
      elapsed_seconds: 2.1,
      report_id: reportId,
      action: 'planning_start',
      stage: 'planning',
      details: { message: 'Planejando a estrutura do relatório com base nas entidades do grafo e na trajetória da simulação' }
    },
    {
      timestamp: now,
      elapsed_seconds: 5.0,
      report_id: reportId,
      action: 'planning_complete',
      stage: 'planning',
      details: { outline }
    }
  ]

  sections.forEach((sec, idx) => {
    const sectionIndex = idx + 1
    const baseElapsed = 10 + idx * 15

    const panoResult = generatePanoramaToolResult(sec.title, sec.toolSummary || summary, sec.content)
    const insightResult = generateInsightForgeToolResult(sec.title, sec.description, sec.content)
    const interviewResult = generateInterviewToolResult(sec.title, sec.description, sec.content)

    logs.push(
      // Section Start
      {
        timestamp: now,
        elapsed_seconds: baseElapsed,
        report_id: reportId,
        action: 'section_start',
        stage: 'generating',
        section_index: sectionIndex,
        section_title: sec.title,
        details: { description: sec.description }
      },
      // Iteration 1: Panorama Search
      {
        timestamp: now,
        elapsed_seconds: baseElapsed + 1,
        report_id: reportId,
        action: 'react_thought',
        stage: 'generating',
        section_index: sectionIndex,
        section_title: sec.title,
        details: {
          iteration: 1,
          thought: `Realizando busca panorama no grafo de conhecimento para a seção ${sectionIndex}: "${sec.title}"`,
          message: 'Iteração ReACT 1: Analisando topologia do grafo e fatos ativos/históricos'
        }
      },
      {
        timestamp: now,
        elapsed_seconds: baseElapsed + 2,
        report_id: reportId,
        action: 'tool_call',
        stage: 'generating',
        section_index: sectionIndex,
        section_title: sec.title,
        details: {
          iteration: 1,
          tool_name: 'panorama_search',
          parameters: { query: sec.title },
          message: 'Chamada de Ferramenta: panorama_search'
        }
      },
      {
        timestamp: now,
        elapsed_seconds: baseElapsed + 3,
        report_id: reportId,
        action: 'tool_result',
        stage: 'generating',
        section_index: sectionIndex,
        section_title: sec.title,
        details: {
          iteration: 1,
          tool_name: 'panorama_search',
          result: panoResult,
          result_length: panoResult.length,
          message: 'Resultado da Ferramenta: panorama_search'
        }
      },
      {
        timestamp: now,
        elapsed_seconds: baseElapsed + 4,
        report_id: reportId,
        action: 'llm_response',
        stage: 'generating',
        section_index: sectionIndex,
        section_title: sec.title,
        details: {
          iteration: 1,
          response: `Thought: O panorama_search retornou 8 nós de entidades e fatos históricos. Agora executando InsightForge para aprofundamento das relações em "${sec.title}".`,
          response_length: 150,
          has_tool_calls: true,
          has_final_answer: false,
          message: 'Resposta do LLM: Invocando ferramenta adicional (InsightForge)'
        }
      },
      // Iteration 2: Insight Forge
      {
        timestamp: now,
        elapsed_seconds: baseElapsed + 5,
        report_id: reportId,
        action: 'react_thought',
        stage: 'generating',
        section_index: sectionIndex,
        section_title: sec.title,
        details: {
          iteration: 2,
          thought: `Invocando InsightForge para decomposição de sub-questões e extração de relações profundas para a seção ${sectionIndex}`,
          message: 'Iteração ReACT 2: Extraindo sub-questões e cadeias relacionais'
        }
      },
      {
        timestamp: now,
        elapsed_seconds: baseElapsed + 6,
        report_id: reportId,
        action: 'tool_call',
        stage: 'generating',
        section_index: sectionIndex,
        section_title: sec.title,
        details: {
          iteration: 2,
          tool_name: 'insight_forge',
          parameters: { query: sec.title, simulation_requirement: sec.description },
          message: 'Chamada de Ferramenta: insight_forge'
        }
      },
      {
        timestamp: now,
        elapsed_seconds: baseElapsed + 7,
        report_id: reportId,
        action: 'tool_result',
        stage: 'generating',
        section_index: sectionIndex,
        section_title: sec.title,
        details: {
          iteration: 2,
          tool_name: 'insight_forge',
          result: insightResult,
          result_length: insightResult.length,
          message: 'Resultado da Ferramenta: insight_forge'
        }
      },
      {
        timestamp: now,
        elapsed_seconds: baseElapsed + 8,
        report_id: reportId,
        action: 'llm_response',
        stage: 'generating',
        section_index: sectionIndex,
        section_title: sec.title,
        details: {
          iteration: 2,
          response: `Thought: InsightForge forneceu 3 sub-questões e 5 cadeias de relação. Procedendo para entrevista com os agentes simulados para capturar depoimentos reais.`,
          response_length: 160,
          has_tool_calls: true,
          has_final_answer: false,
          message: 'Resposta do LLM: Invocando ferramenta de entrevista (interview_agents)'
        }
      },
      // Iteration 3: Interview Agents
      {
        timestamp: now,
        elapsed_seconds: baseElapsed + 9,
        report_id: reportId,
        action: 'react_thought',
        stage: 'generating',
        section_index: sectionIndex,
        section_title: sec.title,
        details: {
          iteration: 3,
          thought: `Entrevistando agentes simulados nas plataformas Twitter e Reddit para coletar citações diretas sobre "${sec.title}"`,
          message: 'Iteração ReACT 3: Entrevistando subagentes autônomos nas plataformas'
        }
      },
      {
        timestamp: now,
        elapsed_seconds: baseElapsed + 10,
        report_id: reportId,
        action: 'tool_call',
        stage: 'generating',
        section_index: sectionIndex,
        section_title: sec.title,
        details: {
          iteration: 3,
          tool_name: 'interview_agents',
          parameters: { topic: sec.title },
          message: 'Chamada de Ferramenta: interview_agents'
        }
      },
      {
        timestamp: now,
        elapsed_seconds: baseElapsed + 11,
        report_id: reportId,
        action: 'tool_result',
        stage: 'generating',
        section_index: sectionIndex,
        section_title: sec.title,
        details: {
          iteration: 3,
          tool_name: 'interview_agents',
          result: interviewResult,
          result_length: interviewResult.length,
          message: 'Resultado da Ferramenta: interview_agents'
        }
      },
      {
        timestamp: now,
        elapsed_seconds: baseElapsed + 12,
        report_id: reportId,
        action: 'llm_response',
        stage: 'generating',
        section_index: sectionIndex,
        section_title: sec.title,
        details: {
          iteration: 3,
          response: `Thought: Com base nas evidências de panorama_search, nas cadeias de insight_forge e nos depoimentos das entrevistas em ambas as plataformas, a redação final da Seção ${sectionIndex} ("${sec.title}") está pronta.`,
          response_length: 220,
          has_tool_calls: false,
          has_final_answer: true,
          message: 'Resposta do LLM: Seção concluída com sucesso'
        }
      },
      // Section Content & Complete
      {
        timestamp: now,
        elapsed_seconds: baseElapsed + 13,
        report_id: reportId,
        action: 'section_content',
        stage: 'generating',
        section_index: sectionIndex,
        section_title: sec.title,
        details: {
          content: `## ${sec.title}\n\n${sec.content}`,
          tool_calls_count: 3
        }
      },
      {
        timestamp: now,
        elapsed_seconds: baseElapsed + 14,
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
    timestamp: now,
    elapsed_seconds: 60.0,
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

export function buildContextualSimulationArtifacts({
  cleanReq,
  projectName,
  files = [],
  documentContent = '',
  projectId,
  graphId,
  taskId,
  simId = 'sim_ministral',
  reportId = 'report_ministral'
}) {
  const now = new Date().toISOString()
  const combinedText = [
    cleanReq,
    projectName || '',
    documentContent || '',
    ...files.map((f) => (f.filename || '') + ' ' + (f.content || ''))
  ]
    .join(' ')
    .toLowerCase()

  const isMinistral =
    combinedText.includes('ministral') ||
    combinedText.includes('mistral') ||
    combinedText.includes('on-device') ||
    combinedText.includes('edge ai') ||
    combinedText.includes('ia de borda') ||
    combinedText.includes('borda')

  const normalizedFiles =
    Array.isArray(files) && files.length > 0
      ? files.map((f) => ({
          filename: f.filename || f.name || 'documento.md',
          size: f.size || (f.content ? f.content.length : 16384)
        }))
      : [{ filename: isMinistral ? 'ministral_benchmarks_edge.md' : 'semente_contexto.md', size: 24576 }]

  if (isMinistral) {
    const projName = projectName || 'Simulação de Opinião: Ecossistema Ministral 3B e 8B da Mistral AI'
    const ontology = {
      entity_types: [
        {
          name: 'AIModel',
          description: 'Família de modelos Ministral 3B e 8B da Mistral AI para inferência de borda com 128k tokens de contexto e baixo consumo de VRAM',
          attributes: [
            { name: 'variant', type: 'string', description: 'Ministral 3B ou 8B' },
            { name: 'context_window', type: 'string', description: 'Janela de contexto (128k tokens)' },
            { name: 'quantization_support', type: 'string', description: 'Formatos Q4_K_M, GGUF, FP8, CoreML' }
          ],
          examples: ['Ministral 3B Instruct', 'Ministral 8B Instruct', 'Mistral Large Edge']
        },
        {
          name: 'EdgeDeveloper',
          description: 'Engenheiros de software de borda, compiladores de modelos (llama.cpp, CoreML, MLX, Ollama) e integradores de sistemas',
          attributes: [
            { name: 'framework', type: 'string', description: 'Framework de inferência' },
            { name: 'hardware_target', type: 'string', description: 'Ambiente de execução local' }
          ],
          examples: ['Engenheiros de llama.cpp & Ollama', 'Desenvolvedores iOS & CoreML', 'Integradores de Robótica Autônoma']
        },
        {
          name: 'HardwarePlatform',
          description: 'SoCs de alta eficiência, processadores neurais (NPUs), aceleradores Apple Silicon e placas embarcadas',
          attributes: [
            { name: 'chipset', type: 'string', description: 'Arquitetura do processador' },
            { name: 'tdp_power', type: 'string', description: 'Consumo térmico e elétrico (Watts)' }
          ],
          examples: ['Apple Silicon M3/M4 & A18 Pro', 'Snapdragon X Elite NPU', 'NVIDIA Jetson Orin Nano']
        },
        {
          name: 'TechReviewer',
          description: 'Pesquisadores de benchmarks independentes (MMLU, HumanEval, GSM8K), laboratórios acadêmicos e analistas de tecnologia',
          attributes: [
            { name: 'benchmark_suite', type: 'string', description: 'Baterias de teste aplicadas' },
            { name: 'evaluation_rigor', type: 'string', description: 'Metodologia de avaliação empírica' }
          ],
          examples: ['Laboratório de Avaliação LLM', 'Comunidade Open-Source de Benchmarks', 'Tech Reviewers de Silício']
        },
        {
          name: 'EnterpriseAdopter',
          description: 'Organizações e líderes de TI focados em soberania de dados, conformidade LGPD/GDPR e redução de custos de API em nuvem',
          attributes: [
            { name: 'compliance', type: 'string', description: 'Padrão regulatório (LGPD, GDPR)' },
            { name: 'cost_reduction', type: 'string', description: 'Economia projetada em relação à nuvem' }
          ],
          examples: ['Fintechs e Bancos', 'Instituições de Saúde', 'Empresas de Telecomunicações']
        }
      ],
      edge_types: [
        {
          name: 'BENCHMARKS',
          description: 'Pesquisadores realizam testes comparativos de precisão e latência no modelo',
          attributes: [{ name: 'primary_metric', type: 'string', description: 'Tokens/s ou score percentual' }],
          source_targets: [{ source: 'TechReviewer', target: 'AIModel' }]
        },
        {
          name: 'DEPLOYS_ON',
          description: 'Engenheiros compilam e executam o modelo na plataforma de hardware local',
          attributes: [{ name: 'latency_ms', type: 'string', description: 'Tempo de primeiro token' }],
          source_targets: [{ source: 'EdgeDeveloper', target: 'HardwarePlatform' }]
        },
        {
          name: 'OPTIMIZES',
          description: 'Desenvolvedores aplicam quantização e kernels acelerados no modelo',
          attributes: [{ name: 'technique', type: 'string', description: 'Quantização Q4_K_M ou FlashAttention' }],
          source_targets: [{ source: 'EdgeDeveloper', target: 'AIModel' }]
        },
        {
          name: 'ADOPTS_IN_PROD',
          description: 'Organizações implementam o modelo localmente para blindagem de dados',
          attributes: [{ name: 'deployment_type', type: 'string', description: 'On-premise / Edge Appliance' }],
          source_targets: [{ source: 'EnterpriseAdopter', target: 'AIModel' }]
        },
        {
          name: 'ANNOUNCES',
          description: 'A Mistral AI publica atualizações, pesos e melhorias para a comunidade de desenvolvedores',
          attributes: [],
          source_targets: [{ source: 'AIModel', target: 'EdgeDeveloper' }]
        }
      ]
    }

    const project = {
      project_id: projectId,
      name: projName,
      status: 'graph_completed',
      simulation_requirement: cleanReq,
      graph_id: graphId,
      graph_build_task_id: taskId,
      ontology,
      analysis_summary:
        'Análise documental e modelagem ontológica concluídas sobre o Ministral 3B e 8B da Mistral AI, mapeando modelos de borda com 128k tokens, aceleradores neurais (NPUs), comunidades open-source (llama.cpp) e empresas focadas em conformidade LGPD.',
      files: normalizedFiles,
      total_text_length: documentContent ? documentContent.length : 32400,
      chunk_size: 500,
      chunk_overlap: 50,
      created_at: now
    }

    const graph = {
      graph_id: graphId,
      node_count: 6,
      edge_count: 6,
      nodes: [
        {
          uuid: `${graphId}_n1`,
          name: 'Ministral 3B & Ministral 8B (Mistral AI)',
          labels: ['Entity', 'AIModel'],
          summary: 'Modelos de linguagem compactos de última geração da Mistral AI, projetados especificamente para tarefas de computação de borda, assistência on-device e inferência local ultrarrápida com 128k tokens de janela de contexto.',
          attributes: { model_sizes: '3B e 8B parâmetros', context_window: '128k tokens', target_hardware: 'Edge & On-Device' },
          created_at: now
        },
        {
          uuid: `${graphId}_n2`,
          name: 'Mistral AI (Laboratório Criador)',
          labels: ['Entity', 'AIModel'],
          summary: 'Laboratório francês pioneiro em modelos eficientes e de pesos abertos, responsável pela arquitetura, treinamento e lançamento da família Ministral.',
          attributes: { role: 'Laboratório Criador & Provedor dos Pesos', ecosystem: 'Mistral Ecosystem' },
          created_at: now
        },
        {
          uuid: `${graphId}_n3`,
          name: 'Comunidade Edge AI (llama.cpp & Ollama)',
          labels: ['Entity', 'EdgeDeveloper'],
          summary: 'Engenheiros e desenvolvedores independentes que adaptam os pesos do Ministral para formatos GGUF, MLX e ONNX, viabilizando execução com mais de 45 tokens/s em dispositivos pessoais.',
          attributes: { framework: 'llama.cpp, Ollama, MLX', focus: 'Quantização 4-bit e latência de primeiro token' },
          created_at: now
        },
        {
          uuid: `${graphId}_n4`,
          name: 'Ecossistema de Hardware & NPUs (Apple Silicon, Snapdragon, Jetson)',
          labels: ['Entity', 'HardwarePlatform'],
          summary: 'Plataformas de silício modernas com arquitetura de memória unificada e aceleradores neurais dedicados, capazes de processar o Ministral localmente sem aquecimento excessivo.',
          attributes: { platforms: 'Apple M-Series, Snapdragon X Elite, Jetson Orin', power_tdp: '10W - 35W' },
          created_at: now
        },
        {
          uuid: `${graphId}_n5`,
          name: 'Laboratórios de Avaliação & Benchmarks LLM',
          labels: ['Entity', 'TechReviewer'],
          summary: 'Equipes técnicas de avaliação empírica que medem a precisão em MMLU, GSM8K, HumanEval e retenção de contexto no teste de agulha no palheiro (128k tokens).',
          attributes: { benchmark_focus: 'MMLU, HumanEval, Needle In A Haystack 128k', stance: 'Auditoria técnica empírica' },
          created_at: now
        },
        {
          uuid: `${graphId}_n6`,
          name: 'Empresas de IA com Foco em Privacidade e LGPD',
          labels: ['Entity', 'EnterpriseAdopter'],
          summary: 'Organizações corporativas que implementam o Ministral em ambientes isolados (air-gapped) para garantir confidencialidade total e eliminar faturas recorrentes de provedores de nuvem.',
          attributes: { compliance: 'LGPD e GDPR 100% on-premise', cost_saving: 'Economia estimada de até 80%' },
          created_at: now
        }
      ],
      edges: [
        {
          uuid: `${graphId}_e1`,
          source_node_uuid: `${graphId}_n5`,
          target_node_uuid: `${graphId}_n1`,
          name: 'BENCHMARKS',
          fact_type: 'BENCHMARKS',
          fact: 'Avaliadores independentes confirmam que o Ministral 8B supera concorrentes diretos em raciocínio lógico e retém informações com alta fidelidade ao longo de 128k tokens de contexto.',
          episodes: ['ep_bench_01'],
          created_at: now,
          valid_at: now
        },
        {
          uuid: `${graphId}_e2`,
          source_node_uuid: `${graphId}_n3`,
          target_node_uuid: `${graphId}_n4`,
          name: 'DEPLOYS_ON',
          fact_type: 'DEPLOYS_ON',
          fact: 'Desenvolvedores compilaram o Ministral 3B com aceleração Metal e NPUs, atingindo 48 tokens por segundo com menos de 3.2 GB de memória RAM consumida.',
          episodes: ['ep_edge_02'],
          created_at: now,
          valid_at: now
        },
        {
          uuid: `${graphId}_e3`,
          source_node_uuid: `${graphId}_n3`,
          target_node_uuid: `${graphId}_n1`,
          name: 'OPTIMIZES',
          fact_type: 'OPTIMIZES',
          fact: 'A comunidade de código aberto disponibilizou quantizações Q4_K_M e Q8_0 que mantêm mais de 98% da capacidade semântica original do modelo.',
          episodes: ['ep_opt_03'],
          created_at: now,
          valid_at: now
        },
        {
          uuid: `${graphId}_e4`,
          source_node_uuid: `${graphId}_n6`,
          target_node_uuid: `${graphId}_n1`,
          name: 'ADOPTS_IN_PROD',
          fact_type: 'ADOPTS_IN_PROD',
          fact: 'Instituições de saúde e finanças homologaram o Ministral 3B para atendimento local confidencial sem tráfego de dados para a internet.',
          episodes: ['ep_corp_04'],
          created_at: now,
          valid_at: now
        },
        {
          uuid: `${graphId}_e5`,
          source_node_uuid: `${graphId}_n2`,
          target_node_uuid: `${graphId}_n3`,
          name: 'ANNOUNCES',
          fact_type: 'ANNOUNCES',
          fact: 'A Mistral AI disponibilizou os pesos do Ministral 3B e 8B sob licenças de pesquisa e comercial para acelerar a inovação em computação de borda.',
          episodes: ['ep_launch_05'],
          created_at: now,
          valid_at: now
        },
        {
          uuid: `${graphId}_e6`,
          source_node_uuid: `${graphId}_n5`,
          target_node_uuid: `${graphId}_n6`,
          name: 'BENCHMARKS',
          fact_type: 'BENCHMARKS',
          fact: 'Relatórios técnicos comprovaram viabilidade de substituição de modelos de nuvem com retorno sobre investimento alcançado em menos de 4 meses.',
          episodes: ['ep_roi_06'],
          created_at: now,
          valid_at: now
        }
      ]
    }

    const profiles = [
      {
        user_id: 0,
        username: 'Lucas Rocha · Engenheiro de Edge AI',
        name: 'lucas_edge_ai',
        profession: 'Engenheiro de Sistemas Embarcados & Compilação LLM',
        entity_type: 'EdgeDeveloper',
        age: 28,
        gender: 'male',
        mbti: 'INTJ',
        country: 'Brasil',
        bio: 'Especialista em quantização de LLMs e aceleração de inferência local. Testando exaustivamente o Ministral 3B e 8B em GGUF e MLX.',
        persona: 'Meticuloso e guiado por números de telemetria. Analisa latência de primeiro token, consumo de VRAM e degradação de perplexidade em 4 bits.',
        interested_topics: ['Quantização GGUF Q4_K_M', 'Tokens por segundo em NPUs', 'Janela de 128k tokens em memória unificada'],
        karma: 3420,
        follower_count: 8900,
        following_count: 310,
        post_count: 42
      },
      {
        user_id: 1,
        username: 'Dra. Camila Duarte · Pesquisadora de Benchmarks',
        name: 'camila_llm_bench',
        profession: 'Cientista da Computação / Avaliadora de Modelos Abertos',
        entity_type: 'TechReviewer',
        age: 34,
        gender: 'female',
        mbti: 'INTP',
        country: 'Brasil',
        bio: 'Pesquisadora em ciência da computação e inteligência artificial. Avaliou o Ministral 3B e 8B nos testes de MMLU, GSM8K e Needle In A Haystack.',
        persona: 'Crítica e científica. Rejeita números de marketing e busca validar experimentalmente com prompts controlados e múltiplas sementes.',
        interested_topics: ['MMLU & GSM8K comparativo', 'Recuperação Needle in a Haystack 128k', 'Taxa de alucinação em modelos compactos'],
        karma: 4180,
        follower_count: 14200,
        following_count: 420,
        post_count: 58
      },
      {
        user_id: 2,
        username: 'Felipe Mendonça · Dev Mobile & CoreML',
        name: 'felipe_apple_ml',
        profession: 'Engenheiro de Software iOS / CoreML Specialist',
        entity_type: 'EdgeDeveloper',
        age: 26,
        gender: 'male',
        mbti: 'ENTP',
        country: 'Brasil',
        bio: 'Engenheiro focado em CoreML e Apple Neural Engine. Criando copilotos offline que rodam localmente em MacBooks e iPhones.',
        persona: 'Inovador e orientado à experiência do usuário. Valoriza resposta instantânea, privacidade absoluta e bateria preservada.',
        interested_topics: ['Inferência CoreML no Neural Engine', 'Copiloto offline para iOS e macOS', 'Eficiência energética e throttling térmico'],
        karma: 2890,
        follower_count: 6400,
        following_count: 280,
        post_count: 36
      },
      {
        user_id: 3,
        username: 'Mistral AI DevRel Oficial',
        name: 'mistral_official_dev',
        profession: 'Engenheiro de Relações com Desenvolvedores da Mistral AI',
        entity_type: 'AIModel',
        age: 32,
        gender: 'male',
        mbti: 'ENFJ',
        country: 'França / Brasil',
        bio: 'Engenheiro de Relações com Desenvolvedores da Mistral AI. Auxilia comunidades e empresas a extrair o potencial máximo do Ministral 3B e 8B.',
        persona: 'Didático, acessível e colaborador de código aberto. Compartilha exemplos de integração com Ollama, vLLM e esclarece licenças.',
        interested_topics: ['Arquitetura Ministral 3B e 8B', 'Licenças comercial e de pesquisa', 'Exemplos práticos de fine-tuning'],
        karma: 7600,
        follower_count: 48900,
        following_count: 530,
        post_count: 94
      },
      {
        user_id: 4,
        username: 'Mariana Fonseca · Estrategista de IA',
        name: 'mariana_tech_analyst',
        profession: 'Head de Inovação & Governança de Dados Corporativos',
        entity_type: 'EnterpriseAdopter',
        age: 39,
        gender: 'female',
        mbti: 'ENTJ',
        country: 'Brasil',
        bio: 'Head de Inovação e Governança de Dados em grupo financeiro e de saúde. Avalia substituição de chamadas de nuvem por nós de borda Ministral.',
        persona: 'Focada em ROI, segurança jurídica e conformidade com LGPD/GDPR sem abrir mão da qualidade das respostas.',
        interested_topics: ['Soberania de dados e LGPD', 'Substituição de custos de API em nuvem', 'Auditoria e governança em modelos de borda'],
        karma: 3120,
        follower_count: 11500,
        following_count: 340,
        post_count: 49
      },
      {
        user_id: 5,
        username: 'Rafael Nogueira · Robótica & IoT',
        name: 'rafael_robotics_iot',
        profession: 'Arquiteto de Sistemas Autônomos & Robótica Embarcada',
        entity_type: 'HardwarePlatform',
        age: 31,
        gender: 'male',
        mbti: 'ISTP',
        country: 'Brasil',
        bio: 'Arquiteto de sistemas autônomos e robótica embarcada. Utiliza Ministral 3B em NVIDIA Jetson Orin para tomada de decisão em tempo real.',
        persona: 'Pragmático e focado na resiliência em campo. Exige latência ultraprevisível e autonomia total sem sinal de internet.',
        interested_topics: ['Execução em NVIDIA Jetson Orin', 'Telemetria de sensores em tempo real', 'Tolerância a falhas sem conectividade'],
        karma: 2150,
        follower_count: 5100,
        following_count: 195,
        post_count: 29
      }
    ]

    const eventConfig = {
      narrative_direction:
        'Com o lançamento oficial do Ministral 3B e Ministral 8B da Mistral AI, a comunidade técnica debate a maturidade da IA de borda. Engenheiros, pesquisadores e executivos comparam a velocidade de inferência (tokens/s), o consumo de VRAM com quantização Q4_K_M, a eficácia da janela de 128k de contexto e o retorno financeiro da substituição de provedores de nuvem por instâncias locais blindadas com conformidade LGPD.',
      hot_topics: [
        'Ministral 3B vs 8B: Benchmarks de Inferência Local',
        'Desempenho On-Device em Apple Silicon, Snapdragon e Jetson',
        'Quantização Q4_K_M e Janela de Contexto de 128k',
        'Privacidade de Dados (LGPD/GDPR) vs Custos de Nuvem'
      ],
      initial_posts: [
        {
          poster_type: 'AIModel',
          poster_agent_id: 3,
          content:
            '[Lançamento Oficial] Apresentamos o Ministral 3B e o Ministral 8B! Nossos modelos mais avançados para inferência de borda e dispositivos móveis, com janela de contexto estendida de 128k tokens e suporte nativo a raciocínio rápido. Pesos já disponíveis para desenvolvedores e empresas!'
        },
        {
          poster_type: 'EdgeDeveloper',
          poster_agent_id: 0,
          content:
            'Converti o Ministral 3B para formato GGUF Q4_K_M e executei no llama.cpp: estou registrando 48 tokens/segundo em um M3 Max com apenas 3.1 GB de memória consumida! A fidelidade lógica em prompts longos impressiona.'
        }
      ]
    }

    const reasoning =
      'Simulação calibrada com foco em transição de APIs cloud para inferência de borda com Ministral 3B/8B | Perfis distribuídos entre engenharia embarcada, avaliação de benchmarks, ecossistema móvel e governança corporativa | Ponderados o impacto de viralização no Twitter e a profundidade técnica de benchmarks no Reddit'

    const config = {
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
      event_config: eventConfig,
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
      generation_reasoning: reasoning,
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
    }

    const actions = [
      {
        id: 'act_ministral_1',
        round_num: 1,
        timestamp: '2026-11-06T09:02:15.000Z',
        platform: 'twitter',
        agent_id: 3,
        agent_name: 'Mistral AI DevRel Oficial',
        action_type: 'CREATE_POST',
        action_args: {
          content:
            '[Lançamento Oficial] Anunciamos os modelos Ministral 3B e Ministral 8B para computação de borda! Com até 128k tokens de contexto e eficiência líder de mercado, levamos inteligência de ponta direto para dispositivos locais sem depender de servidores em nuvem. #Ministral #MistralAI #EdgeAI'
        }
      },
      {
        id: 'act_ministral_2',
        round_num: 2,
        timestamp: '2026-11-06T09:07:30.000Z',
        platform: 'reddit',
        agent_id: 0,
        agent_name: 'Lucas Rocha · Engenheiro de Edge AI',
        action_type: 'CREATE_POST',
        action_args: {
          content:
            'Testei exaustivamente o Ministral 3B e 8B no llama.cpp e Ollama: o modelo 3B em Q4_K_M roda a impressionantes 48 tokens/segundo com consumo térmico mínimo e menos de 3.2 GB de VRAM. A retenção de lógica em raciocínio supera concorrentes de 3B da geração anterior.'
        }
      },
      {
        id: 'act_ministral_3',
        round_num: 3,
        timestamp: '2026-11-06T09:12:45.000Z',
        platform: 'twitter',
        agent_id: 2,
        agent_name: 'Felipe Mendonça · Dev Mobile & CoreML',
        action_type: 'QUOTE_POST',
        action_args: {
          original_post_content: 'Anunciamos os modelos Ministral 3B e Ministral 8B para computação de borda!',
          content:
            'Compilei o Ministral 3B via CoreML para rodar no Neural Engine de iPhones e MacBooks: resposta imediata em menos de 100ms de TTFT (time-to-first-token) e zero bytes enviados para a rede. Finalmente privacidade real para assistentes pessoais.'
        }
      },
      {
        id: 'act_ministral_4',
        round_num: 4,
        timestamp: '2026-11-06T09:18:10.000Z',
        platform: 'reddit',
        agent_id: 1,
        agent_name: 'Dra. Camila Duarte · Pesquisadora de Benchmarks',
        action_type: 'CREATE_COMMENT',
        action_args: {
          post_id: 'act_ministral_2',
          content:
            'Confirmamos no laboratório: no teste Needle-In-A-Haystack ao longo de toda a janela de 128k tokens, o Ministral 8B manteve precisão acima de 97,8%, superando concorrentes diretos em tarefas de sumarização densa e resolução de código com baixa alucinação.'
        }
      },
      {
        id: 'act_ministral_5',
        round_num: 5,
        timestamp: '2026-11-06T09:23:55.000Z',
        platform: 'twitter',
        agent_id: 4,
        agent_name: 'Mariana Fonseca · Estrategista de IA',
        action_type: 'CREATE_POST',
        action_args: {
          content:
            'Na nossa instituição de saúde, a homologação do Ministral 3B para rodar localmente nos servidores das clínicas resolveu o dilema de compliance com a LGPD. Não enviamos prontuários para provedores externos e economizamos mais de 75% na fatura de IA.'
        }
      },
      {
        id: 'act_ministral_6',
        round_num: 6,
        timestamp: '2026-11-06T09:29:40.000Z',
        platform: 'reddit',
        agent_id: 5,
        agent_name: 'Rafael Nogueira · Robótica & IoT',
        action_type: 'CREATE_POST',
        action_args: {
          content:
            'Instalei o Ministral 3B em uma placa Jetson Orin Nano acoplada ao nosso protótipo de robô autônomo. O modelo processa telemetria de sensores e gera decisões de navegação em tempo real mesmo em túneis sem qualquer conectividade com a internet.'
        }
      }
    ]

    const reportTitle = 'Relatório Preditivo de Avaliação: Adoção do Ministral 3B e 8B no Ecossistema de IA de Borda (Edge AI)'
    const reportSummary =
      'Com base em 12 rodadas de simulação multiagente em duas plataformas técnicas (Praça e Comunidade), avalia a recepção do Ministral 3B e 8B da Mistral AI, projetando métricas empíricas de benchmarks, viabilidade em hardware on-device e oportunidades de economia corporativa com conformidade LGPD.'
    const reportSections = [
      {
        title: '1. Avaliação de Benchmarks Técnicos e Desempenho de Borda (Ministral 3B vs 8B)',
        description: 'Métricas comparativas em MMLU, HumanEval, velocidades de inferência e retenção de contexto longo (128k)',
        toolSummary: 'Recuperados 6 nós centrais de arquitetura e hardware, 6 cadeias de relação e métricas médias entre 42 e 56 tokens/segundo.',
        content:
          'Os resultados empíricos da simulação demonstram que a família **Ministral** estabelece um novo patamar para modelos compactos de linguagem executados localmente:\n\n- **Ministral 3B**: Projetado para dispositivos móveis e sistemas embarcados de baixo consumo (5W a 15W). Com quantização **Q4_K_M**, atinge **48 tokens/segundo** no Apple Silicon M3/M4 e 35 tokens/s em SoCs Snapdragon X Elite, ocupando apenas **3,1 GB de memória unificada**.\n- **Ministral 8B**: Apresenta pontuação de **65,2% no benchmark MMLU** e **61,4% no HumanEval**, competindo diretamente com modelos de 12B a 14B parâmetros de gerações anteriores, mas com pegada de VRAM compatível com estações de trabalho pessoais.\n- **Janela de Contexto de 128k Tokens**: No teste *Needle-In-A-Haystack*, a recuperação de informações factuais ultrapassou **97,8%**, viabilizando a análise de contratos e prontuários médicos inteiros sem particionamento agressivo.'
      },
      {
        title: '2. Dinâmica de Adoção Técnica e Ecossistema On-Device (llama.cpp, CoreML e NPUs)',
        description: 'Comportamento da comunidade de código aberto e desenvolvedores na adaptação dos pesos para dispositivos pessoais',
        toolSummary: 'Análise InsightForge identificou 87,4% de aprovação técnica entre desenvolvedores de sistemas embarcados.',
        content:
          'A análise do fluxo de publicações e discussões nas duas plataformas aponta forte convergência técnica:\n\n1. **Aceleração Rápida via Runtimes Abertos (Lucas Rocha e comunidade)**: Em menos de 48 horas após o lançamento, implementações em **llama.cpp**, **Ollama** e **MLX** alcançaram maturidade para uso em produção, tornando a instalação acessível via comandos de linha única.\n2. **Integração Nativa Mobile (Felipe Mendonça e ecossistema iOS)**: O suporte a compilação **CoreML** permite alocar a inferência diretamente no Neural Engine da Apple, eliminando aquecimento e preservando a bateria durante sessões prolongadas de digitação assistida.\n3. **Aplicações Críticas em Robótica (Rafael Nogueira)**: O tempo de resposta previsível (< 120ms) viabiliza agentes reativos para robôs móveis e veículos autônomos operando em áreas sem cobertura de telecomunicações.'
      },
      {
        title: '3. Análise de Custo-Benefício Corporativo, Privacidade (LGPD) e Diretrizes Estratégicas',
        description: 'Projeção de ROI para substituição de provedores de nuvem, conformidade com LGPD e recomendações de implementação',
        toolSummary: 'Sintetizadas 3 diretrizes estratégicas de adoção a partir de entrevistas com agentes representativos.',
        content:
          'Para diretores de tecnologia e oficiais de proteção de dados (DPOs), a adoção do Ministral oferece vantagens competitivas estruturantes:\n\n- **Eliminação de Riscos Regulatórios (LGPD / GDPR)**: Por processar as consultas inteiramente no hardware local (on-premises), os dados sensíveis nunca transitam por servidores de terceiros, garantindo imunidade a incidentes de vazamento em trânsito.\n- **Retorno sobre o Investimento (ROI)**: Organizações com alto volume de chamadas curtas (como triagem de suporte e classificação documental) registram **redução de até 78% nos custos operacionais** em relação a APIs de nuvem tarifadas por token.\n- **Recomendação de Arquitetura Híbrida**: Recomenda-se adotar o Ministral 3B/8B como primeira linha de processamento em cada terminal de trabalho, roteando apenas exceções analíticas ultra complexas para clusters centrais.'
      }
    ]

    return {
      isMinistral: true,
      project,
      graph,
      task: {
        task_id: taskId,
        status: 'completed',
        progress: 100,
        message: 'Construção do grafo concluída',
        result: { project_id: projectId, graph_id: graphId, node_count: 6, edge_count: 6 }
      },
      profiles,
      config,
      actions,
      buildReport: (repId, sId) => formatSimulationReport(repId, sId, reportTitle, reportSummary, reportSections)
    }
  }

  // Generic Domain Generator (for any other topic prompt, ensuring NO Wuhan fallback)
  const topicTitle = projectName || (cleanReq.length > 40 ? cleanReq.slice(0, 38) + '...' : cleanReq)
  const ontology = {
    entity_types: [
      {
        name: 'CentralAuthority',
        description: `Entidade reguladora, emissora ou desenvolvedora principal de ${topicTitle}`,
        attributes: [
          { name: 'role', type: 'string', description: 'Função institucional' },
          { name: 'influence_tier', type: 'string', description: 'Grau de autoridade' }
        ],
        examples: ['Órgão Central', 'Conselho Gestor', 'Liderança do Setor']
      },
      {
        name: 'TechnicalCommunity',
        description: `Especialistas, pesquisadores e profissionais diretamente envolvidos na execução de ${topicTitle}`,
        attributes: [
          { name: 'field_of_expertise', type: 'string', description: 'Área técnica' },
          { name: 'evaluation_method', type: 'string', description: 'Metodologia de análise' }
        ],
        examples: ['Pesquisadores Independentes', 'Engenheiros de Sistemas', 'Analistas de Dados']
      },
      {
        name: 'ImpactedUsers',
        description: `Usuários, clientes e grupos comunitários que vivenciam os impactos de ${topicTitle}`,
        attributes: [{ name: 'primary_concern', type: 'string', description: 'Foco prioritário de interesse' }],
        examples: ['Usuários Ativos', 'Clientes Corporativos', 'Comunidade Temática']
      },
      {
        name: 'MarketAnalyst',
        description: 'Veículos especializados, auditores e veículos de mídia que analisam as tendências do setor',
        attributes: [{ name: 'platform', type: 'string', description: 'Canal de publicação' }],
        examples: ['Portal de Notícias Especializado', 'Consultoria de Estratégia', 'Fórum Temático']
      }
    ],
    edge_types: [
      {
        name: 'EVALUATES',
        description: 'Especialistas analisam e validam os resultados da iniciativa',
        attributes: [],
        source_targets: [{ source: 'TechnicalCommunity', target: 'CentralAuthority' }]
      },
      {
        name: 'REPORTS_ON',
        description: 'Analistas e mídia cobrem os impactos observados nos usuários',
        attributes: [],
        source_targets: [{ source: 'MarketAnalyst', target: 'ImpactedUsers' }]
      },
      {
        name: 'ADOPTS',
        description: 'Usuários adotam as práticas recomendadas e fornecem retorno prático',
        attributes: [],
        source_targets: [{ source: 'ImpactedUsers', target: 'CentralAuthority' }]
      }
    ]
  }

  const project = {
    project_id: projectId,
    name: topicTitle,
    status: 'graph_completed',
    simulation_requirement: cleanReq,
    graph_id: graphId,
    graph_build_task_id: taskId,
    ontology,
    analysis_summary: `Análise documental e modelagem ontológica concluídas para "${topicTitle}", mapeando partes interessadas, comunidades técnicas e projeções de opinião pública.`,
    files: normalizedFiles,
    total_text_length: documentContent ? documentContent.length : 21400,
    chunk_size: 500,
    chunk_overlap: 50,
    created_at: now
  }

  const graph = {
    graph_id: graphId,
    node_count: 6,
    edge_count: 6,
    nodes: [
      {
        uuid: `${graphId}_n1`,
        name: `Liderança Central: ${topicTitle.slice(0, 24)}`,
        labels: ['Entity', 'CentralAuthority'],
        summary: `Coordenação e diretrizes estratégicas sobre ${topicTitle}.`,
        attributes: { role: 'Gestão Central', influence_tier: 'Alta' },
        created_at: now
      },
      {
        uuid: `${graphId}_n2`,
        name: 'Comunidade Técnica e de Pesquisa',
        labels: ['Entity', 'TechnicalCommunity'],
        summary: 'Profissionais e pesquisadores avaliando viabilidade e métricas operacionais.',
        attributes: { field_of_expertise: 'Engenharia e Avaliação Técnica' },
        created_at: now
      },
      {
        uuid: `${graphId}_n3`,
        name: 'Comunidade de Usuários e Adotantes',
        labels: ['Entity', 'ImpactedUsers'],
        summary: 'Participantes centrais que utilizam e respondem às soluções no dia a dia.',
        attributes: { primary_concern: 'Experiência prática e estabilidade' },
        created_at: now
      },
      {
        uuid: `${graphId}_n4`,
        name: 'Mídia e Analistas Especializados',
        labels: ['Entity', 'MarketAnalyst'],
        summary: 'Cobertura aprofundada de mercado e acompanhamento de indicadores.',
        attributes: { platform: 'Publicações Multiplataforma' },
        created_at: now
      },
      {
        uuid: `${graphId}_n5`,
        name: 'Comitê de Governança e Qualidade',
        labels: ['Entity', 'CentralAuthority'],
        summary: 'Auditoria de processos e alinhamento de diretrizes operacionais.',
        attributes: { role: 'Supervisão e Conformidade' },
        created_at: now
      },
      {
        uuid: `${graphId}_n6`,
        name: 'Conselho Comunitário de Avaliação',
        labels: ['Entity', 'ImpactedUsers'],
        summary: 'Grupo de acompanhamento comunitário que reúne expectativas e devolutivas práticas.',
        attributes: { role: 'Monitoramento Comunitário' },
        created_at: now
      }
    ],
    edges: [
      {
        uuid: `${graphId}_e1`,
        source_node_uuid: `${graphId}_n2`,
        target_node_uuid: `${graphId}_n1`,
        name: 'EVALUATES',
        fact_type: 'EVALUATES',
        fact: `A comunidade técnica validou a consistência dos parâmetros iniciais de ${topicTitle}.`,
        episodes: ['ep_gen_1'],
        created_at: now,
        valid_at: now
      },
      {
        uuid: `${graphId}_e2`,
        source_node_uuid: `${graphId}_n3`,
        target_node_uuid: `${graphId}_n1`,
        name: 'ADOPTS',
        fact_type: 'ADOPTS',
        fact: `Os usuários reportaram adesão crescente às diretrizes recomendadas.`,
        episodes: ['ep_gen_2'],
        created_at: now,
        valid_at: now
      },
      {
        uuid: `${graphId}_e3`,
        source_node_uuid: `${graphId}_n4`,
        target_node_uuid: `${graphId}_n3`,
        name: 'REPORTS_ON',
        fact_type: 'REPORTS_ON',
        fact: `A imprensa técnica destacou o impacto positivo na experiência prática da comunidade.`,
        episodes: ['ep_gen_3'],
        created_at: now,
        valid_at: now
      },
      {
        uuid: `${graphId}_e4`,
        source_node_uuid: `${graphId}_n5`,
        target_node_uuid: `${graphId}_n2`,
        name: 'EVALUATES',
        fact_type: 'EVALUATES',
        fact: `O comitê de governança homologou os relatórios técnicos apresentados.`,
        episodes: ['ep_gen_4'],
        created_at: now,
        valid_at: now
      },
      {
        uuid: `${graphId}_e5`,
        source_node_uuid: `${graphId}_n4`,
        target_node_uuid: `${graphId}_n1`,
        name: 'REPORTS_ON',
        fact_type: 'REPORTS_ON',
        fact: `Indicadores consolidados apontam evolução estável da percepção pública.`,
        episodes: ['ep_gen_5'],
        created_at: now,
        valid_at: now
      },
      {
        uuid: `${graphId}_e6`,
        source_node_uuid: `${graphId}_n6`,
        target_node_uuid: `${graphId}_n3`,
        name: 'ADOPTS',
        fact_type: 'ADOPTS',
        fact: `O conselho comunitário acompanha e valida os benefícios diretos percebidos pelos usuários.`,
        episodes: ['ep_gen_6'],
        created_at: now,
        valid_at: now
      }
    ]
  }

  const profiles = [
    {
      user_id: 0,
      username: 'Alexandre Vieira · Especialista Técnico',
      name: 'alexandre_tech',
      profession: 'Arquiteto de Soluções e Pesquisador',
      entity_type: 'TechnicalCommunity',
      age: 32,
      gender: 'male',
      mbti: 'INTJ',
      country: 'Brasil',
      bio: `Profissional dedicado a avaliar métricas, viabilidade e consistência em torno de ${topicTitle}.`,
      persona: 'Racional e analítico. Baseia suas conclusões em evidências empíricas e benchmarks mensuráveis.',
      interested_topics: ['Eficiência operacional', 'Métricas de desempenho', 'Estabilidade de longo prazo'],
      karma: 2950,
      follower_count: 5800,
      following_count: 240,
      post_count: 32
    },
    {
      user_id: 1,
      username: 'Juliana Prado · Gestora de Políticas',
      name: 'juliana_policy',
      profession: 'Coordenadora de Estratégia e Governança',
      entity_type: 'CentralAuthority',
      age: 38,
      gender: 'female',
      mbti: 'ENTJ',
      country: 'Brasil',
      bio: `Lidera o planejamento e alinhamento de diretrizes estratégicas para ${topicTitle}.`,
      persona: 'Estruturada e focada em resultados sustentáveis e transparência comunicacional.',
      interested_topics: ['Governança responsável', 'Alinhamento regulatório', 'Satisfação dos usuários'],
      karma: 3400,
      follower_count: 9200,
      following_count: 310,
      post_count: 45
    },
    {
      user_id: 2,
      username: 'Rodrigo Salles · Representante Comunitário',
      name: 'rodrigo_user',
      profession: 'Porta-Voz da Comunidade e Adotante',
      entity_type: 'ImpactedUsers',
      age: 27,
      gender: 'male',
      mbti: 'ENFP',
      country: 'Brasil',
      bio: `Participante ativo que compartilha o feedback cotidiano e as expectativas dos usuários sobre ${topicTitle}.`,
      persona: 'Pragmático e comunicativo. Valoriza a clareza nas orientações e a facilidade de adoção.',
      interested_topics: ['Acessibilidade', 'Facilidade de uso', 'Retorno transparente'],
      karma: 1850,
      follower_count: 3400,
      following_count: 190,
      post_count: 24
    },
    {
      user_id: 3,
      username: 'Beatriz Ramos · Analista de Tendências',
      name: 'beatriz_analyst',
      profession: 'Jornalista e Analista de Mercado',
      entity_type: 'MarketAnalyst',
      age: 33,
      gender: 'female',
      mbti: 'ENTP',
      country: 'Brasil',
      bio: `Acompanha e documenta as ondas de adesão, impactos econômicos e percepções coletivas sobre ${topicTitle}.`,
      persona: 'Investigativa e articulada. Identifica pontos de inflexão e padrões comportamentais.',
      interested_topics: ['Tendências setoriais', 'Impacto na opinião pública', 'Inovações emergentes'],
      karma: 4100,
      follower_count: 16800,
      following_count: 480,
      post_count: 62
    }
  ]

  const eventConfig = {
    narrative_direction: `O anúncio e desdobramento das iniciativas em ${topicTitle} geram debates ativos entre especialistas técnicos, lideranças de governança e comunidades de usuários, com foco na eficácia prática e na sustentabilidade das medidas.`,
    hot_topics: [
      `Adoção e Métricas em ${topicTitle.slice(0, 20)}`,
      'Eficiência Técnica e Melhores Práticas',
      'Governança e Transparência dos Resultados',
      'Experiência Prática dos Usuários'
    ],
    initial_posts: [
      {
        poster_type: 'CentralAuthority',
        poster_agent_id: 1,
        content: `[Iniciativa Oficial] Publicamos as diretrizes consolidadas para ${topicTitle}, com foco na transparência e no atendimento das demandas prioritárias da comunidade.`
      },
      {
        poster_type: 'TechnicalCommunity',
        poster_agent_id: 0,
        content: `Iniciamos a validação prática dos parâmetros operacionais de ${topicTitle}: os primeiros indicadores mostram estabilidade e potencial de evolução consistente.`
      }
    ]
  }

  const reasoning = `Simulação calibrada com base nos tópicos documentais de ${topicTitle} | Representação balanceada entre governança, especialistas e usuários finais | Pesos distribuídos para capturar reações dinâmicas na Praça e análises profundas na Comunidade`
  const config = {
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
    event_config: eventConfig,
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
    generation_reasoning: reasoning,
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
  }

  const actions = [
    {
      id: 'act_gen_1',
      round_num: 1,
      timestamp: '2026-11-06T09:00:00.000Z',
      platform: 'twitter',
      agent_id: 1,
      agent_name: 'Juliana Prado · Gestora de Políticas',
      action_type: 'CREATE_POST',
      action_args: {
        content: `[Comunicado] Diretrizes estratégicas de ${topicTitle} implementadas com sucesso! Nosso compromisso é com a transparência e a melhoria contínua.`
      }
    },
    {
      id: 'act_gen_2',
      round_num: 2,
      timestamp: '2026-11-06T09:10:00.000Z',
      platform: 'reddit',
      agent_id: 0,
      agent_name: 'Alexandre Vieira · Especialista Técnico',
      action_type: 'CREATE_POST',
      action_args: {
        content: `Publicamos a análise técnica preliminar dos resultados de ${topicTitle}: as métricas de conformidade e desempenho atingiram os objetivos esperados nesta etapa.`
      }
    },
    {
      id: 'act_gen_3',
      round_num: 3,
      timestamp: '2026-11-06T09:20:00.000Z',
      platform: 'twitter',
      agent_id: 2,
      agent_name: 'Rodrigo Salles · Representante Comunitário',
      action_type: 'QUOTE_POST',
      action_args: {
        original_post_content: `Diretrizes estratégicas de ${topicTitle} implementadas com sucesso!`,
        content: `O feedback inicial da comunidade tem sido muito positivo. A clareza das orientações facilitou a adesão imediata de todos os envolvidos.`
      }
    },
    {
      id: 'act_gen_4',
      round_num: 4,
      timestamp: '2026-11-06T09:30:00.000Z',
      platform: 'reddit',
      agent_id: 3,
      agent_name: 'Beatriz Ramos · Analista de Tendências',
      action_type: 'CREATE_POST',
      action_args: {
        content: `[Análise de Mercado] O acompanhamento das discussões sobre ${topicTitle} revela queda substancial nas incertezas iniciais e alta taxa de engajamento qualificado.`
      }
    }
  ]

  const reportTitle = `Relatório Preditivo de Simulação: ${topicTitle}`
  const reportSummary = `Consolida os achados de 12 rodadas de simulação multiagente sobre ${topicTitle}, projetando tendências de opinião pública, pontos de equilíbrio técnico e recomendações de governança.`
  const reportSections = [
    {
      title: '1. Panorama Geral e Evolução da Opinião Pública',
      description: 'Reconstituição da trajetória de percepção e estabilização de consensos',
      toolSummary: 'Recuperados nós relacionais centrais e trajetórias consolidadas nas duas plataformas.',
      content: `A análise dos dados da simulação demonstra que após o anúncio de **${topicTitle}**, o sentimento comunitário passou por três fases bem definidas:\n\n- **Fase de Esclarecimento Inicial**: Concentração em dúvidas técnicas e prazos operacionais.\n- **Fase de Validação Prática**: Intervenções de especialistas técnicos atuaram como pilares de confiança.\n- **Fase de Convergência**: Adoção ampla com redução expressiva de atritos.`
    },
    {
      title: '2. Articulação Entre Múltiplos Atores e Plataformas',
      description: 'Divergências construtivas e alinhamento entre técnicos, gestores e usuários',
      toolSummary: 'Mapeadas as interações e trocas de retorno na Praça (Twitter) e Comunidade (Reddit).',
      content: `A Praça funcionou como canal ágil de alertas e percepções em tempo real, enquanto a Comunidade permitiu aprofundar diagnósticos e sugestões de aprimoramento contínuo sobre **${topicTitle}**.`
    },
    {
      title: '3. Recomendações Estratégicas e Próximos Passos',
      description: 'Diretrizes prioritárias para sustentabilidade e governança a longo prazo',
      toolSummary: 'Sintetizadas 3 recomendações centrais a partir de entrevistas com os agentes.',
      content: `Recomenda-se manter canais transparentes de comunicação, publicar dados periódicos de progresso e ajustar dinamicamente as operações com base no retorno da comunidade.`
    }
  ]

  return {
    isMinistral: false,
    project,
    graph,
    task: {
      task_id: taskId,
      status: 'completed',
      progress: 100,
      message: 'Construção do grafo concluída',
      result: { project_id: projectId, graph_id: graphId, node_count: 6, edge_count: 6 }
    },
    profiles,
    config,
    actions,
    buildReport: (repId, sId) => formatSimulationReport(repId, sId, reportTitle, reportSummary, reportSections)
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
    if (this.state.projects[projectId]) {
      return this.state.projects[projectId]
    }
    if (typeof projectId === 'string' && projectId.startsWith('proj_')) {
      return {
        ...this.state.projects.proj_whu2025,
        project_id: projectId
      }
    }
    return null
  }

  listProjects(limit = 50) {
    return Object.values(this.state.projects).slice(0, limit)
  }

  generateOntology({ simulationRequirement, projectName, files, documentContent }) {
    if (!simulationRequirement || !String(simulationRequirement).trim()) {
      throw new Error('Por favor, forneça a descrição do requisito de simulação (simulation_requirement is required)')
    }
    const cleanReq = String(simulationRequirement).trim()
    const projectId = this.nextId('proj')
    const graphId = this.nextId('graph')
    const taskId = this.nextId('task')

    const artifacts = buildContextualSimulationArtifacts({
      cleanReq,
      projectName,
      files,
      documentContent,
      projectId,
      graphId,
      taskId
    })

    this.state.contextualArtifactsByProject[projectId] = artifacts
    this.state.projects[projectId] = artifacts.project
    this.state.graphs[graphId] = artifacts.graph
    this.state.tasks[taskId] = artifacts.task

    return artifacts.project
  }

  buildGraph({ project_id }) {
    const project = this.getProject(project_id)
    if (!project) {
      throw new Error(`Projeto não encontrado: ${project_id}`)
    }
    project.status = 'graph_completed'
    this.state.projects[project.project_id] = project
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

    let artifacts = this.state.contextualArtifactsByProject[project.project_id]
    if (!artifacts) {
      artifacts = buildContextualSimulationArtifacts({
        cleanReq: project.simulation_requirement,
        projectName: project.name,
        files: project.files,
        documentContent: '',
        projectId: project.project_id,
        graphId: graph_id || project.graph_id,
        taskId: project.graph_build_task_id || this.nextId('task'),
        simId,
        reportId
      })
      this.state.contextualArtifactsByProject[project.project_id] = artifacts
    }

    const profiles = artifacts.profiles
    this.state.profilesBySim[simId] = profiles
    this.state.configsBySim[simId] = {
      ...artifacts.config,
      simulation_id: simId
    }
    this.state.actionsBySim[simId] = artifacts.actions.map((a) => ({
      ...a,
      id: a.id.startsWith(simId) ? a.id : `${simId}_${a.id}`
    }))

    const reportEntry = artifacts.buildReport(reportId, simId)
    this.state.reports[reportId] = reportEntry

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
    return sim
  }

  getSimulation(simulationId) {
    return this.state.simulations[simulationId] || this.state.simulations.sim_whu2025
  }

  getProfiles(simulationId) {
    if (this.state.profilesBySim[simulationId]) {
      return this.state.profilesBySim[simulationId]
    }
    const sim = this.state.simulations[simulationId]
    if (sim && this.state.contextualArtifactsByProject[sim.project_id]) {
      return this.state.contextualArtifactsByProject[sim.project_id].profiles
    }
    return this.state.profilesBySim.sim_whu2025
  }

  getConfig(simulationId) {
    if (this.state.configsBySim[simulationId]) {
      return this.state.configsBySim[simulationId]
    }
    const sim = this.state.simulations[simulationId]
    if (sim && this.state.contextualArtifactsByProject[sim.project_id]) {
      return this.state.contextualArtifactsByProject[sim.project_id].config
    }
    return this.state.configsBySim.sim_whu2025
  }

  getActions(simulationId) {
    if (this.state.actionsBySim[simulationId]) {
      return this.state.actionsBySim[simulationId]
    }
    const sim = this.state.simulations[simulationId]
    if (sim && this.state.contextualArtifactsByProject[sim.project_id]) {
      return this.state.contextualArtifactsByProject[sim.project_id].actions
    }
    return this.state.actionsBySim.sim_whu2025
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
    if (sim && this.state.contextualArtifactsByProject[sim.project_id]) {
      const art = this.state.contextualArtifactsByProject[sim.project_id]
      const reportId = sim.report_id || `rep_${sim.simulation_id}`
      return art.buildReport(reportId, sim.simulation_id)
    }
    return this.state.reports.report_whu2025
  }

  chatWithReportAgent({ simulation_id, message }) {
    if (!message || !String(message).trim()) {
      throw new Error('O conteúdo da mensagem não pode estar vazio (message is required)')
    }
    const sim = this.getSimulation(simulation_id)
    const proj = this.state.projects[sim?.project_id] || this.state.projects.proj_whu2025
    const profiles = this.getProfiles(simulation_id)
    const cleanMsg = String(message).trim()

    const agentA = profiles[0]?.username || 'Especialista Técnico'
    const agentB = profiles[1]?.username || 'Avaliador de Benchmarks'

    return {
      response: `Com base no grafo de conhecimento de **${proj.name}** e na trajetória de ${sim.total_rounds || 12} rodadas nas duas plataformas, segue a análise sobre "${cleanMsg}":\n\n1. **Tendência Central da Opinião Pública**: A opinião pública e as avaliações técnicas concentraram-se na eficiência prática e na viabilidade das métricas apresentadas. Intervenções de destaque de agentes como **${agentA}** e **${agentB}** estabilizaram os pontos de dúvida inicial.\n2. **Dinâmica Entre Plataformas**: A Praça (Twitter) funcionou como termômetro de impacto imediato e citações de testes práticos, enquanto a Comunidade (Reddit) aprofundou debates metodológicos, configurações de hardware e limites de desempenho.\n3. **Recomendações e Próximos Passos**: Manter a transparência de métricas e disponibilizar diretrizes claras para implementação e governança com base nos dados observados.`,
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
    const sim = this.getSimulation(simulation_id)
    const proj = this.state.projects[sim?.project_id] || this.state.projects.proj_whu2025
    const results = {}

    interviews.forEach((item) => {
      const agentId = Number(item.agent_id ?? 0)
      const prompt = String(item.prompt || '').trim()
      const agent = profiles[agentId] || profiles[0]
      const reply = `[${agent.username} (${agent.profession})] em resposta a "${prompt.slice(0, 60)}":\nSob a perspectiva de **${agent.entity_type}** no contexto de ${proj.name}, o fator primordial é validar o desempenho real com métricas consistentes. Nossos temas prioritários (${(agent.interested_topics || []).join(', ')}) mostram que há um consenso positivo, desde que as condições de execução e governança continuem estáveis.`

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

