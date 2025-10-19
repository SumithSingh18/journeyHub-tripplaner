# Terraform configuration for TripPlanner infrastructure
# This will be expanded in Week 6

terraform {
  required_version = ">= 1.0"
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.0"
    }
  }
}

# Variables
variable "cluster_name" {
  description = "Name of the Kubernetes cluster"
  type        = string
  default     = "tripplanner-cluster"
}

variable "namespace" {
  description = "Kubernetes namespace"
  type        = string
  default     = "tripplanner"
}

# Kubernetes namespace
resource "kubernetes_namespace" "tripplanner" {
  metadata {
    name = var.namespace
    labels = {
      app = "tripplanner"
    }
  }
}

# PostgreSQL StatefulSet (basic setup)
resource "kubernetes_stateful_set" "postgres" {
  metadata {
    name      = "postgres"
    namespace = kubernetes_namespace.tripplanner.metadata[0].name
  }

  spec {
    service_name = "postgres"
    replicas     = 1

    selector {
      match_labels = {
        app = "postgres"
      }
    }

    template {
      metadata {
        labels = {
          app = "postgres"
        }
      }

      spec {
        container {
          name  = "postgres"
          image = "postgres:15-alpine"

          env {
            name  = "POSTGRES_DB"
            value = "tripplanner"
          }
          env {
            name  = "POSTGRES_USER"
            value = "tripplanner"
          }
          env {
            name = "POSTGRES_PASSWORD"
            value_from {
              secret_key_ref {
                name = "postgres-secret"
                key  = "password"
              }
            }
          }

          port {
            container_port = 5432
          }

          volume_mount {
            name       = "postgres-storage"
            mount_path = "/var/lib/postgresql/data"
          }
        }
      }
    }

    volume_claim_template {
      metadata {
        name = "postgres-storage"
      }
      spec {
        access_modes = ["ReadWriteOnce"]
        resources {
          requests = {
            storage = "10Gi"
          }
        }
      }
    }
  }
}

# Output
output "namespace" {
  value = kubernetes_namespace.tripplanner.metadata[0].name
}