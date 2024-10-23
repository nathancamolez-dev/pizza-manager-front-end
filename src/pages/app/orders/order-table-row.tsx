import { ArrowRight, Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { OrderDetails } from './order-details'
import type { OrderTableRowProps } from './orders'
import { OrderStatus } from '@/components/order-status'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cancelOrder } from '@/api/cancel-order'
import type { GetOrdersResponse } from '@/api/get-orders'
import { toast } from 'sonner'
import { approveOrder } from '@/api/approve-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'

export function OrderTableRow({ orders }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const queryClient = useQueryClient()

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
    const ordersCached = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    // biome-ignore lint/complexity/noForEach: <explanation>
    ordersCached.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }
      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map(order => {
          if (order.orderId === orderId) {
            return { ...order, status }
          }
          return order
        }),
      })
    })
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancellingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      onSuccess: (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, 'cancelled')
        toast.success('O pedido foi cancelado com sucesso!', {
          closeButton: true,
        })
      },
    })

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      onSuccess: (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, 'preparing')
        toast.success('O pedido foi aprovado com sucesso!', {
          closeButton: true,
        })
      },
    })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      onSuccess: (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, 'delivering')
        toast.success('O pedido saiu para entrega!', {
          closeButton: true,
        })
      },
    })
  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      onSuccess: (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, 'delivered')
        toast.success('O pedido foi entregue com sucesso!', {
          closeButton: true,
        })
      },
    })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only"> Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails open={isDetailsOpen} orderId={orders.orderId} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {orders.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(orders.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={orders.status} />
      </TableCell>
      <TableCell className="font-medium">{orders.customerName}</TableCell>
      <TableCell className="font-medium">
        {(orders.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        {orders.status === 'pending' && (
          <Button
            onClick={() => approveOrderFn({ orderId: orders.orderId })}
            disabled={isApprovingOrder}
            variant="ghost"
            size="xs"
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Aprovar
          </Button>
        )}
        {orders.status === 'preparing' && (
          <Button
            onClick={() => dispatchOrderFn({ orderId: orders.orderId })}
            disabled={isDispatchingOrder}
            variant="ghost"
            size="xs"
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Em entrega
          </Button>
        )}

        {orders.status === 'delivering' && (
          <Button
            onClick={() => deliverOrderFn({ orderId: orders.orderId })}
            disabled={isDeliveringOrder}
            variant="ghost"
            size="xs"
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Enregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          disabled={
            !['pending', 'preparing'].includes(orders.status) ||
            isCancellingOrder
          }
          onClick={() => cancelOrderFn({ orderId: orders.orderId })}
          variant="ghost"
          size="xs"
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
