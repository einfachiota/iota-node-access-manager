<template>
  <div class="footer">
    <div class="row">
      <div class="footer-main">
        <router-link to="/" class="footer-logo" exact-active-class="active">
          <img alt="Tangle Bay" class="logo" src="../assets/logo.png" />
        </router-link>
        <p>Your gate to the Tangle.</p>
      </div>
      <div class="footer-main">
        <h4>Tangle Bay</h4>
        <div class="divider"></div>
        <a class="footer-main-link" href="https://tanglebay.org/cluster">Cluster</a>
        <a class="footer-main-link" href="https://tanglebay.org/community">Community Nodes</a>
        <a class="footer-main-link" href="https://twitter.com/tanglebay">Twitter</a>
      </div>
      <div class="footer-main">
        <h4>einfachIOTA</h4>
        <div class="divider"></div>
        <a href="https://einfachIOTA.de" target="_blank" class="footer-main-link">Blog</a>
        <a href="https://community.einfachIOTA.de" target="_blank" class="footer-main-link">Forum</a>
        <a href="https://twitter.com/einfachiota" target="_blank" class="footer-main-link">Twitter</a>
      </div>
      <div class="footer-main">
        <h4>IOTA</h4>
        <div class="divider"></div>
        <a href="https://www.iota.org" target="_blank" class="footer-main-link">Website</a>
        <a href="https://trinity.iota.org" target="_blank" class="footer-main-link">Trinity Wallet</a>
        <a href="https://discord.iota.org" target="_blank" class="footer-main-link">Discord</a>
      </div>
    </div>
    <div class="row footer-bottom">
      <div class="footer-bottom-col">
        © <a class="footer-main-link" href="https://tanglebay.org">Tanglebay</a>
      </div>
      <div class="footer-bottom-col">
      </div>
      <div class="footer-bottom-col">
        <a
          href="https://tanglebay.org/contact/" target="_blank" class="footer-main-link"
        >Contact</a>
        <a
          href="https://tanglebay.org/privacy-policy/"
          class="footer-main-link"
        >Privacy Policy</a>
        <a
          href="https://tanglebay.org/legal-notice/"
          class="footer-main-link"
        >Legal Notice</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.footer {
  background-color: var(--primary);
  width: 100%;
  padding: 50px 50px 0;
  box-sizing: border-box;
  text-align: center;
  border-top: 5px solid var(--primary);
    color: var(--light);
  .row {
    display: flex;
    justify-content: space-between;
  }
  .footer-main {
    text-align: left;
    width: 25%;
    margin-right: 50px;
    margin-bottom: 50px;
    &:last-child {
      margin-right: 0;
    }
    .logo {
      height: 70px;
    }
    h4 {
      font-size: 20px;
      line-height: 1;
      margin-bottom: 15px;
    }
    .divider {
      width: 50px;
      margin: 15px 0;
    }
    .footer-main-link {
      display: block;
      color: var(--light);
      margin: 0;
      line-height: 2;
      font-size: 16px;
      text-decoration: none;
      transition: color 200ms ease-in-out;
      &:hover {
        color: var(--white);
      }
    }
  }
  .footer-bottom {
    padding: 15px 50px;
    margin: 0 -50px;
    border-top: 0.5px solid rgba(0, 0, 0, 0.25);
    color: var(--light);
    .footer-bottom-col {
      .footer-main-link {
        color: var(--light);
        margin: 0 10px;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .footer-main-link {
      color: rgba(0, 0, 0, 0.75);
      text-decoration: none;
      transition: color 200ms ease-in-out;
      &:hover {
        color: var(--white);
      }
    }
  }
}
@media only screen and (max-width: 992px) {
  .footer {
    .row {
      flex-wrap: wrap;
      .footer-main {
        width: calc(50% - 50px);
        &:nth-child(even) {
          margin-right: 0;
        }
      }
    }
    .row.footer-bottom {
      .footer-bottom-col {
        width: 50%;
        &:first-child {
          text-align: left;
        }
        &:nth-child(2) {
          text-align: right;
        }
        &:nth-child(3) {
          width: 100%;
          text-align: left;
          margin-top: 10px;
        }
      }
    }
  }
}
@media only screen and (max-width: 624px) {
  .footer {
    .row {
      flex-wrap: wrap;
      .footer-main {
        width: 100%;
        margin-right: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
    }
    .row.footer-bottom {
      .footer-bottom-col {
        width: 100%;
        &:first-child {
          text-align: center;
        }
        &:nth-child(2) {
          text-align: center;
          margin-top: 10px;
        }
        &:nth-child(3) {
          text-align: center;
          margin-top: 10px;
        }
      }
    }
  }
}
@media only screen and (max-width: 360px) {
  .footer {
    padding: 30px 30px 0;
    .row.footer-bottom {
      margin: 0 -30px;
      padding: 15px 30px;
    }
  }
}
</style>
