import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'NAVIGATION',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      //DASHBOARD
      {
        id: 'main',
        title: 'Dashboard',
        type: 'item',
        icon: 'feather icon-home',
        url: '/dashboard/main'
      },
      //STOCKS
      {
        id: 'main',
        title: 'Stocks',
        type: 'item',
        icon: 'feather icon-layers',
        url: '/stocks/main',
      },
      {
        id: 'orderslist',
        title: 'Liste Commandes',
        type: 'item',
        url: '/stocks/orderslist',
        hidden: true,
      },
      {
        id: 'listcreate',
        title: 'Produits Ajoutés',
        type: 'item',
        url: '/stocks/listcreate',
        hidden: true,
      },
      {
        id: 'orderdetail',
        title: 'Détail de ',
        type: 'item',
        url: '/stocks/orderdetail',
        hidden: true,
      },
      {
        id: 'listnew',
        title: 'Nouvelle Commande',
        type: 'item',
        url: '/stocks/listnew',
        hidden: true,
      },
      {
        id: 'stockProducts',
        title: 'Produits en Stock',
        type: 'item',
        url: '/stocks/stockProducts',
        hidden: true,
      },
      {
        id: 'barresCodes',
        title: 'Generation de Codes Barres',
        type: 'item',
        url: '/stocks/barresCodes',
        hidden: true,
      },
      {
        id: 'printbarresCodes',
        title: 'Impression de Codes Barres',
        type: 'item',
        url: '/stocks/printbarresCodes',
        hidden: true,
      },
      {
        id: 'seuilStocks',
        title: 'Seuil de Stocks des Produits',
        type: 'item',
        url: '/stocks/seuilStocks',
        hidden: true,
      },

      {
        id: 'hsProducts',
        title: 'Prouits Hors Seuil',
        type: 'item',
        url: '/stocks/hsProducts',
        hidden: true,
      },
      {
        id: 'transStocks',
        title: 'Transferts de Stocks',
        type: 'item',
        url: '/stocks/transStocks',
        hidden: true,
      },

      //VENTES
      {
        id: 'main',
        title: 'Ventes',
        type: 'item',
        icon: 'feather icon-shopping-cart',
        url: '/ventes/main',
      },
      {
        id: 'createsale',
        title: 'Nouvelle Vente',
        type: 'item',
        url: '/ventes/createsale',
        hidden: true,
      },
      {
        id: 'partialsale',
        title: 'Nouvelle Vente à Crédit',
        type: 'item',
        url: '/ventes/partialsale',
        hidden: true,
      },
      {
        id: 'listsales',
        title: 'Liste des ventes',
        type: 'item',
        url: '/ventes/listsales',
        hidden: true,
      },
      {
        id: 'listdevis',
        title: 'Liste des Devis',
        type: 'item',
        url: '/ventes/listdevis',
        hidden: true,
      },
      //STATISTIQUES
      {
        id: 'statistiques',
        title: 'Statistiques',
        type: 'collapse',
        icon: 'feather icon-trending-up',
        children: [
          {
            id: 'globalStats',
            title: 'Point Général',
            type: 'item',
            url: '/statistiques/globalStats'
          },
          {
            id: 'productSoldStats',
            title: 'Produits les Plus Vendus',
            type: 'item',
            url: '/statistiques/productSoldStats'
          },
          {
            id: 'productStats',
            title: 'Point par Produit',
            type: 'item',
            url: '/statistiques/productStats'
          },
          {
            id: 'sellersStats',
            title: 'Ventes par Profil',
            type: 'item',
            url: '/statistiques/sellersStats'
          },
          {
            id: 'customersStats',
            title: 'Achats par Client',
            type: 'item',
            url: '/statistiques/customersStats'
          },
        ]
      },
      //PARAMETRES
      {
        id: 'parametres',
        title: 'Paramètres',
        type: 'collapse',
        icon: 'feather icon-settings',
        children: [
          {
            id: 'agencies',
            title: 'Agences',
            type: 'item',
            url: '/parametres/agencies'
          },
          {
            id: 'categories',
            title: 'Categories',
            type: 'item',
            url: '/parametres/categories'
          },

          {
            id: 'compartments',
            title: 'Rayons',
            type: 'item',
            url: '/parametres/compartments'
          },
          {
            id: 'measuretypes',
            title: 'Types Mesures',
            type: 'item',
            url: '/parametres/measuretypes'
          },
          {
            id: 'suppliers',
            title: 'Fournisseurs',
            type: 'item',
            url: '/parametres/suppliers'
          },
          {
            id: 'saletargets',
            title: 'Objectif de ventes',
            type: 'item',
            url: '/parametres/saletargets'
          },
          {
            id: 'products',
            title: 'Produits',
            type: 'item',
            url: '/parametres/products'
          },
          {
            id: 'paramMecef',
            title: 'Paramétrage MECEF',
            type: 'item',
            url: '/parametres/paramMecef'
          },
           {
            id: 'logs',
            title: 'Logs',
            type: 'item',
            url: '/parametres/logs'
          }
        ]
      },
      //GESTION CLIENTELE
      {
        id: 'customers',
        title: 'Gestion Clientèle',
        type: 'item',
        icon: 'feather icon-users',
        url: '/parametres/customers'
      },
      //SECURITE
      {
        id: 'securite',
        title: 'Sécurité',
        type: 'collapse',
        icon: 'feather icon-shield',
        children: [
          {
            id: 'groups',
            title: 'Groupes',
            type: 'item',
            url: '/securite/groups'
          },
          {
            id: 'users',
            title: 'Utilisateurs',
            type: 'item',
            url: '/securite/users',
          },
          {
            id: 'profiles',
            title: 'Profiles',
            type: 'item',
            url: '/securite/profiles'
          },
          {
            id: 'current',
            title: 'Ma licence',
            type: 'item',
            url: '/securite/current'
          }
        ]
      },
      {
        id: 'finances',
        title: 'Finances',
        type: 'collapse',
        icon: 'feather icon-activity',
        children: [
          {
            id: 'banks',
            title: 'Banques',
            type: 'item',
            url: '/finances/banks',
          },
          {
            id: 'vaccounts',
            title: 'Comptes',
            type: 'item',
            url: '/finances/vaccounts'
          },
          {
            id: 'operations',
            title: 'Mouvements sur Compte',
            type: 'item',
            url: '/finances/operations'
          }
        ]
      }

    ]
  },
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
